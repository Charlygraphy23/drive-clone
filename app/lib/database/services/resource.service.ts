import { getListOfChildFoldersQuery } from "@/app/api/resources/_fetch";
import { DefaultedQueryObserverOptions } from "@tanstack/react-query";
import { FilterQuery, MongooseUpdateQueryOptions, PipelineStage, SessionOption, Types } from "mongoose";
import { AccessDocumentType, AccessSchemaType } from "../interfaces/access.interface";
import { CreateDataType, DATA_TYPE, FilesAndFolderDocument, FilesAndFolderSchemaType } from "../interfaces/files.interfaces";
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

                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                                email: 1,
                                imageUrl: 1
                            }
                        }
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

    async findFolderByName(name: string, parentFolderId: string, options?: SessionOption) {
        return await Model.findOne({
            name: name,
            parentFolderId: parentFolderId ?? null
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

    async getResources(userId: string, resourceId?: string, showDeleted = false, resourceType: DATA_TYPE | null = null) {

        const initialQuery = {
            createdBy: new Types.ObjectId(userId)
        } as FilterQuery<Partial<Record<keyof FilesAndFolderSchemaType, any>>>

        if (resourceId) {
            initialQuery["parentFolderId"] = new Types.ObjectId(resourceId);
        } else {
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
            ...this.getUserInfo(new Types.ObjectId(userId)),
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

        return await Model.aggregate(pipelines, {
            withDeleted: showDeleted
        })
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

                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                                email: 1,
                                imageUrl: 1
                            }
                        }
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

        const folders = (await Model.aggregate(query, options)) as Array<{ _id: string } & FilesAndFolderSchemaType>;
        const folderIdsToDelete = folders?.map(folder => folder?._id);

        const _options = options as MongooseUpdateQueryOptions
        return await Model.updateMany({ _id: { $in: folderIdsToDelete } }, { isDeleted: true }, _options)
    }

    async restoreDeletedResources(resourceId: string, options?: SessionOption) {
        const query = getListOfChildFoldersQuery(resourceId);

        const folders = (await Model.aggregate(query, options)) as Array<{ _id: string } & FilesAndFolderSchemaType>;
        const folderIdsToDelete = folders?.map(folder => folder?._id);

        const _options = options as MongooseUpdateQueryOptions
        return await Model.updateMany({ _id: { $in: folderIdsToDelete } }, { isDeleted: false }, _options)
    }

    async deleteForever(resourceId: string, options?: SessionOption) {
        const query = getListOfChildFoldersQuery(resourceId);

        const folders = (await Model.aggregate(query, options)) as Array<{ _id: string } & FilesAndFolderSchemaType>;
        const folderIdsToDelete = folders?.map(folder => folder?._id);

        const _options = options as DefaultedQueryObserverOptions
        return await Model.deleteMany({ _id: { $in: folderIdsToDelete } }, _options)
    }

}