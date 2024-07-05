import { getChildrenAccessListByFolderId, getListOfChildFoldersQuery } from "@/app/api/resources/_fetch";
import { ResourceDatasetType } from "@/app/components/body/components/resources/interfaces/index.interface";
import { ResourcePayloadType } from "@/app/interfaces/index.interface";
import { CRYPTO } from "@/app/utils/crypto";
import { LOCAL_S3 } from "@/app/utils/s3";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";
import mimeType from "mime-types";
import mongoose, { FilterQuery, MongooseUpdateQueryOptions, PipelineStage, SessionOption, Types } from "mongoose";
import { userInfoProjectionAggregationQuery } from "../../lib";
import { AccessDocumentType, AccessSchemaType } from "../interfaces/access.interface";
import { CreateDataType, DATA_TYPE, FilesAndFolderDocument, FilesAndFolderSchemaType, UploadFileType } from "../interfaces/files.interfaces";
import { FilesAndFolderModel } from "../models/filesAndFolders";
import { AccessService } from "./access.service";

const Model = FilesAndFolderModel

export class ResourceService {

    private handleVideoStream = async ({ fileInfo, range, key }: {
        fileInfo: FilesAndFolderSchemaType, range: string, key: string
    }) => {

        if (!fileInfo?.mimeType || !fileInfo?.mimeType?.startsWith("video/")) {
            throw new Error("Required a video file!")
        }

        const CHUNK_SIZE = 10 ** 6 - (10 ** 5 * 2); // 800Kb
        const size = fileInfo?.fileSize ?? 0
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, size - 1);
        const contentLength = end - start + 1;

        const streamRange = `bytes=${start}-${end}`

        const s3 = new LOCAL_S3({
            key
        })
        const data = await s3.get({
            Range: streamRange
        })

        return {
            stream: data?.Body,
            contentLength,
            size,
            start,
            end
        }
    }

    private getUserInfo(userId: string | Types.ObjectId) {
        return [
            {
                $lookup: {
                    from: "users",
                    let: { userId },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$userId"] }
                            }
                        },

                        userInfoProjectionAggregationQuery()
                    ],
                    as: "userInfo"
                }
            },
        ]
    }


    async find(filter: FilterQuery<FilesAndFolderDocument>, limit = 0, options?: SessionOption) {
        return Model.find(filter, null, options).limit(limit);
    }

    async checkAccess(userId: string, filters: Partial<AccessSchemaType>, options?: SessionOption): Promise<{ data: AccessDocumentType | null, success: boolean, resource?: FilesAndFolderDocument | null }> {
        const accessService = new AccessService()

        console.log("Checking access....")

        if (!filters.resourceId) {
            // User accessing / creating resource from root path
            return { data: null, success: true }
        }
        console.log(
            "filters: " + filters
        )

        const resourceExist = await Model.findById({ _id: filters.resourceId }, null, options)
        if (!resourceExist) return { data: null, success: false }

        if (resourceExist?.createdBy?.toString() === userId) {
            // If the resource owner wants to access the resources
            delete filters.accessType
            delete filters.origin
        }
        const hasAccess = await accessService.findByUser(userId, filters, options)

        if (!hasAccess) return { data: null, success: false }

        return { data: hasAccess, success: true, resource: resourceExist }

    }

    async findResourceByName(name: string, parentFolderId: string, options?: SessionOption) {
        return await Model.findOne({
            name: name,
            parentFolderId: parentFolderId || null
        }, null, options)
    }

    async createFolder(payload: CreateDataType, options?: SessionOption) {
        return await Model.create([{
            name: payload?.name,
            createdBy: payload?.createdBy,
            lastModified: new Date(),
            dataType: payload.type,
            parentFolderId: payload?.parentFolderId ?? null
        }], options)
    }

    async getResources({
        folderId = "",
        resourceType = null,
        showDeleted = false,
        shared = "off",
        page = 1,
        limit = 10,
        userId,
        search,
        filters,
        fileId
    }: ResourcePayloadType): Promise<{
        page?: number
        limit?: number
        total?: number
        resources: ResourceDatasetType["files"]
        next?: boolean
    }> {

        console.log("Filters ", filters)

        const initialQuery = {
        } as FilterQuery<Partial<Record<keyof FilesAndFolderSchemaType, any>>>

        if (search) {
            initialQuery.name = { $regex: search, $options: 'i' }
        }

        if (filters && Object.keys(filters)?.length) {
            const createdAt = filters?.createdAt ?? [];
            const type = filters?.type ?? []

            if (createdAt?.length) {
                const [from, to] = createdAt;

                initialQuery.createdAt = {
                    $lte: new Date(to),
                    $gte: new Date(from)
                }
            }

            if (type?.length) {
                const convertedToDataTypes = type?.reduce<string[]>((prev, curr) => {
                    const mime = mimeType.lookup(curr) || ""
                    if (mime) prev.push(mime)

                    return prev
                }, [])

                initialQuery.mimeType = {
                    $in: convertedToDataTypes
                }
            }
        }

        if (shared === "off" || showDeleted) {
            initialQuery.createdBy = new Types.ObjectId(userId)
        } else if (shared === "only" && !showDeleted) {
            console.log("Shared")
            initialQuery.createdBy = { $ne: new Types.ObjectId(userId) }
        }

        if (folderId && !showDeleted) {
            initialQuery["parentFolderId"] = new Types.ObjectId(folderId);
        } else if (!showDeleted) {
            initialQuery.$expr = {
                $or: [
                    {
                        $eq: [{ $type: "$parentFolderId" }, "missing"]
                    },
                    {
                        $lte: ["$parentFolderId", null]
                    }
                ]
            }
        }

        if (fileId && resourceType === DATA_TYPE.FILE) {
            initialQuery["_id"] = new Types.ObjectId(fileId)
        }

        if (showDeleted) {
            initialQuery["isDeleted"] = { $eq: true }
            initialQuery["deletedForever"] = { $ne: true }
        }

        if (resourceType) {
            initialQuery["dataType"] = resourceType
        }



        const pipelines = [
            ...this.getUserInfo("$createdBy"),
            {
                $unwind: {
                    path: "$userInfo",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $lookup: {
                    from: "accesses",
                    let: { createdFor: new Types.ObjectId(userId), folderId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$createdFor", "$$createdFor"] },
                                        { $eq: ["$resourceId", "$$folderId"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "access"
                }
            },

            {
                $unwind: {
                    path: "$access",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $addFields: {
                    hasAccess: {
                        $cond: {
                            if: {
                                $and: [
                                    { $gt: ["$access", null] },
                                    { $ne: [{ $type: "$access" }, "missing"] },
                                ]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            },

            // {
            //     $project: {
            //         access: 0,
            //     }
            // },

            {
                $match: {
                    ...initialQuery,
                    hasAccess: true
                }
            },

            {
                $project: {
                    hasAccess: 0,
                }
            },

        ] as PipelineStage[]


        if (showDeleted) {
            pipelines.push({
                // Use $graphLookup to find all ancestors
                $graphLookup: {
                    from: 'files_and_folders', // The name of your collection
                    startWith: '$parentFolderId',
                    connectFromField: 'parentFolderId',
                    connectToField: '_id',
                    as: 'ancestors',
                    restrictSearchWithMatch: { isDeleted: true },
                },
            },
                {
                    // Add a field to indicate if the document has a deleted ancestor
                    $addFields: {
                        hasDeletedAncestor: { $gt: [{ $size: '$ancestors' }, 0] },
                    },
                },
                {
                    // Match only documents that do not have a deleted ancestor
                    $match: {
                        hasDeletedAncestor: false,
                    },
                },
                {
                    $project: {
                        hasDeletedAncestor: 0,
                        ancestors: 0
                    }
                }
            )
        }


        const withPagination: PipelineStage[] = Array.from([] as PipelineStage[]).concat(pipelines)


        if (limit && page) {
            const skip = (page - 1) * limit
            withPagination.push({ $skip: skip }, {
                $limit: limit
            })
        }
        const response = await Model.aggregate([
            {
                $facet: {
                    totalDocuments: [...pipelines as any[], { $count: "total" }],
                    "resources": withPagination as PipelineStage.FacetPipelineStage[]
                }
            },
            {
                $project: {
                    totalDocuments: { $arrayElemAt: ['$totalDocuments.total', 0] },
                    resources: 1
                }
            }

        ], {
            withDeleted: showDeleted
        })

        const data = response?.[0]

        if (page && limit) {

            const totalPages = Math.ceil(data?.totalDocuments / limit)
            return {
                page: page,
                limit: limit,
                total: data?.totalDocuments,
                resources: data?.resources,
                next: page < totalPages,
            }
        }

        return {
            page: page,
            limit: limit,
            total: data?.totalDocuments,
            resources: data?.resources,
            next: false
        }
    }

    async findOne(filters: Partial<Record<keyof (FilesAndFolderSchemaType & { _id: string }), any>>, options?: SessionOption) {
        return await Model.findOne(filters, null, options)
    }

    async resourceInfo(resourceId: string, loggedUserId: string, options?: SessionOption) {
        const resourceList = await Model.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(resourceId)
                }
            },

            {
                $addFields: {
                    isOwner: {
                        $cond: {
                            if: {
                                $eq: ["$createdBy", new Types.ObjectId(loggedUserId)]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            },

            {
                $lookup: {
                    from: "users",
                    let: { userId: "$createdBy" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$userId"] }
                            }
                        },
                        userInfoProjectionAggregationQuery()
                    ],
                    as: "ownerInfo"
                }
            },

            {
                $unwind: {
                    path: "$ownerInfo",
                    preserveNullAndEmptyArrays: true
                }
            },



            {
                $project: {
                    createdBy: 0,
                    key: 0
                }
            },

            {
                $lookup: {
                    from: "accesses",
                    let: { folderId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$resourceId", "$$folderId"] }
                            }
                        },
                        ...this.getUserInfo("$createdFor"),
                        {
                            $unwind: {
                                path: "$userInfo",
                                preserveNullAndEmptyArrays: true
                            }
                        },

                        {
                            $project: {
                                createdFor: 0
                            }
                        }


                    ],
                    as: "accessList"
                }
            },

        ], options)

        return resourceList?.[0] ?? null
    }

    async updateName(_id: string, name: string) {
        return await Model.findOneAndUpdate({ _id }, { name, lastUpdate: new Date() })
    }

    async softDeleteResourceById(resourceId: string, options?: SessionOption) {
        const query = getListOfChildFoldersQuery(resourceId);

        const resources = (await Model.aggregate(query, options)) as Array<{ _id: string } & FilesAndFolderSchemaType>;
        const childFolderToDelete = resources?.map(resource => resource?._id);

        const _options = options as MongooseUpdateQueryOptions;
        return await Model.updateMany({ _id: { $in: childFolderToDelete } }, { isDeleted: true }, _options)
    }

    async restoreDeletedResources(resourceId: string, options?: SessionOption) {
        const query = getListOfChildFoldersQuery(resourceId);

        const resources = (await Model.aggregate(query, options)) as Array<{ _id: string } & FilesAndFolderSchemaType>;
        const resourceIdsToDelete = resources?.map(folder => folder?._id);

        const _options = options as MongooseUpdateQueryOptions
        return await Model.updateMany({ _id: { $in: resourceIdsToDelete } }, { isDeleted: false }, _options)
    }

    async deleteForever(resourceId: string, options?: SessionOption) {
        const folders = (await getChildrenAccessListByFolderId(resourceId, options)) as Array<{ _id: string, accesses: Array<{ _id: string } & AccessSchemaType> } & FilesAndFolderSchemaType>;
        const folderIdsToDelete = folders?.map(folder => {
            return folder?._id
        });
        const updateOptions = options as MongooseUpdateQueryOptions
        return Model.updateMany({ _id: { $in: folderIdsToDelete } }, { deletedForever: true }, updateOptions)
    }

    async getResourceFromS3({ key }: {
        key: string
    }) {

        const s3 = new LOCAL_S3({
            key
        })

        const res = await s3.get()
        const array = await res.Body?.transformToByteArray()
        return array
    }

    async upload(payload: UploadFileType, options: SessionOption) {
        const accessService = new AccessService()

        const key = `${payload?.userId}/${payload?.fileName}`
        const encryptedKey = CRYPTO.encryptWithBase64(key)

        const s3 = new LOCAL_S3({
            key,
            body: payload.file,
            uploadId: payload?.uploadId
        })

        try {
            if (payload?.chunkIndex === 0) {
                console.log("Found first data as chunk")
                await s3.createMultipartUpload()
            }

            console.log("Uploading Chunk...")
            await s3.uploadPart({
                file: payload.file
            }, payload?.chunkIndex)

            if (payload?.chunkIndex === payload?.totalChunks - 1) {
                console.log("Completing Upload...")
                await s3.completeMultipartUpload()

                console.log("Saving file info to DB")
                const [res] = await Model.create([{
                    name: payload?.fileName,
                    createdBy: payload?.createdBy,
                    lastModified: new Date(),
                    dataType: DATA_TYPE.FILE,
                    parentFolderId: payload?.parentFolderId || null,
                    mimeType: mimeType.lookup(payload.fileName),
                    fileSize: payload?.size,
                    fileName: payload?.fileName,
                    key: encryptedKey
                }], {
                    ...options,
                    isNew: true
                })

                const fileInfo = res?.toJSON()
                console.log("Saving access")
                await accessService.createWithParent({
                    userId: String(payload?.userId), parentFolderId: String(payload?.parentFolderId ?? ""), resourceId: fileInfo?._id
                }, options)

                return { uploadId: s3.uploadId, fileInfo: fileInfo }
            }


        }
        catch (err) {
            console.log("Aborting upload")
            await s3.abortMultipartUpload()
            throw err
        }

        return { uploadId: s3.uploadId, fileInfo: null }

    }

    async getFile(fileId: string) {

        const fileInfo = await Model.findById({ _id: new mongoose.Types.ObjectId(fileId) }).select("+key")

        if (!fileInfo) throw new Error("No Content");

        const key = CRYPTO.decryptTextFromBase64(fileInfo?.key ?? "");

        if (!key) throw new Error("No Content")


        const s3 = new LOCAL_S3({
            key
        })
        const data = await s3.get()
        const array = await data?.Body?.transformToByteArray()
        if (!array) throw new Error("No Content")

        return [array, fileInfo?.mimeType, fileInfo?.name]
    }

    async getFileStream(fileId: string, range: string): Promise<{
        stream?: GetObjectCommandOutput["Body"],
        contentLength?: number,
        fileInfo: FilesAndFolderSchemaType,
        end?: number,
        start?: number,
        size?: number,

    }> {

        const fileInfo = await Model.findById({ _id: new mongoose.Types.ObjectId(fileId) }).select("+key")

        if (!fileInfo) throw new Error("No Content");
        const key = CRYPTO.decryptTextFromBase64(fileInfo?.key ?? "");

        if (!key) throw new Error("No Content")

        if (fileInfo?.mimeType && fileInfo?.mimeType?.startsWith("video") && range) {
            const { stream, contentLength, end, size, start } = await this.handleVideoStream({
                fileInfo, range: range, key
            })

            return {
                stream,
                fileInfo,
                contentLength,
                end,
                size,
                start
            }

        }

        const s3 = new LOCAL_S3({
            key
        })
        const data = await s3.get()
        const body = data?.Body
        if (!body) throw new Error("No Content")

        return {
            stream: body, fileInfo
        }
    }

}