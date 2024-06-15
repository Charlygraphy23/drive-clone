import { getChildrenAccessListByFolderId, getListOfChildFoldersQuery } from "@/app/api/resources/_fetch";
import { ResourceDatasetType } from "@/app/components/body/components/resources/interfaces/index.interface";
import { CRYPTO } from "@/app/utils/crypto";
import { LOCAL_S3 } from "@/app/utils/s3";
import { DefaultedQueryObserverOptions } from "@tanstack/react-query";
import mimeType from "mime-types";
import { FilterQuery, MongooseUpdateQueryOptions, PipelineStage, SessionOption, Types } from "mongoose";
import { userInfoProjectionAggregationQuery } from "../../lib";
import { AccessDocumentType, AccessSchemaType } from "../interfaces/access.interface";
import { CreateDataType, DATA_TYPE, FilesAndFolderDocument, FilesAndFolderSchemaType, UploadFileType } from "../interfaces/files.interfaces";
import { AccessModal } from "../models/access";
import { FilesAndFolderModel } from "../models/filesAndFolders";
import { AccessService } from "./access.service";

const Model = FilesAndFolderModel

export class ResourceService {

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

    async getResources(userId: string, folderId?: string, showDeleted = false, resourceType: DATA_TYPE | null = null, shared: "only" | "show" | "off" = "off", page?: number, limit?: number): Promise<{
        page?: number
        limit?: number
        total?: number
        resources: ResourceDatasetType["files"]
        next?: boolean
    }> {

        const initialQuery = {
        } as FilterQuery<Partial<Record<keyof FilesAndFolderSchemaType, any>>>

        if (shared === "off" || showDeleted) {
            initialQuery.createdBy = new Types.ObjectId(userId)
        } else if (shared === "only" && !showDeleted) {
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

        if (showDeleted) {
            initialQuery["isDeleted"] = { $eq: true }
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

            {
                $project: {
                    access: 0,
                }
            },

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


        const withPagination: PipelineStage[] = [].concat(pipelines)

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
                    "resources": withPagination
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

    async folderInfo(folderId: string, loggedUserId: string, options?: SessionOption) {
        const folderList = await Model.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(folderId)
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

        return folderList?.[0] ?? null
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
        console.log("folders", JSON.stringify(folders));

        const accessIdsToDelete: string[] = [] as string[]
        const folderIdsToDelete = folders?.map(folder => {
            const accessIds = folder?.accesses?.map(access => access?._id)
            accessIdsToDelete.push(...accessIds)
            return folder?._id
        });

        const _options = options as DefaultedQueryObserverOptions
        return await Promise.all([
            Model.deleteMany({ _id: { $in: folderIdsToDelete } }, _options),
            AccessModal.deleteMany({ _id: { $in: accessIdsToDelete } }, _options)
        ])
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

}