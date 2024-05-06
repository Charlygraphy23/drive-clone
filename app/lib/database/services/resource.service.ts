import { FilterQuery, PipelineStage, SessionOption, Types } from "mongoose";
import { AccessDocumentType, AccessSchemaType } from "../interfaces/access.interface";
import { CreateDataType, DATA_TYPE, FilesAndFolderSchemaType } from "../interfaces/files.interfaces";
import { FilesAndFolderModel } from "../models/filesAndFolders";
import { AccessService } from "./access.service";

const Model = FilesAndFolderModel
const accessService = new AccessService()
export class ResourceService {

    async checkAccess(userId: string, filters: Partial<AccessSchemaType>, options?: SessionOption): Promise<{ data: AccessDocumentType | null, success: boolean }> {
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

        return { data: hasAccess, success: true }

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

    async getFolders(userId: string, folderId?: string) {

        const initialQuery = {
            dataType: DATA_TYPE.FOLDER
        } as FilterQuery<Partial<Record<keyof FilesAndFolderSchemaType, any>>>

        if (folderId) {
            initialQuery["parentFolderId"] = new Types.ObjectId(folderId);
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

        const pipelines = [

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
            }
        ] as PipelineStage[]

        return await Model.aggregate(pipelines)
    }

    async findOne(filters: Partial<Record<keyof (FilesAndFolderSchemaType & { _id: string }), any>>, options?: SessionOption) {
        return await Model.findOne(filters, null, options)
    }

    async folderInfo(folderId: string, loggedUserId: string) {
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
                    from: "files_and_folders",
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
            }

        ])

        return folderList?.[0] ?? null
    }


    async updateName(_id: string, name: string) {
        return await Model.findOneAndUpdate({ _id }, { name, lastUpdate: new Date() })
    }

}