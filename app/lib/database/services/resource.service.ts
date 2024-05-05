import { FilterQuery, PipelineStage, SessionOption, Types } from "mongoose";
import { AccessSchemaType } from "../interfaces/access.interface";
import { CreateDataType, DATA_TYPE, FilesAndFolderSchemaType } from "../interfaces/files.interfaces";
import { FilesAndFolderModel } from "../models/filesAndFolders";
import { AccessService } from "./access.service";

const Model = FilesAndFolderModel
const accessService = new AccessService()
export class ResourceService {

    async checkAccess(userId: string, filters: Partial<AccessSchemaType>, options?: SessionOption) {
        console.log("Checking access....")
        const resourceExist = await Model.findById({ _id: filters.resourceId }, null, options)
        if (!resourceExist) return null;

        if (resourceExist?.createdBy?.toString() === userId) {
            // If the resource owner wants to access the resources
            delete filters.accessType
            delete filters.origin
        }
        const hasAccess = await accessService.findByUser(userId, filters, options)

        if (!hasAccess) return null

        return hasAccess
    }

    async findFolderByName(name: string, parentFolderId: string, options?: SessionOption) {
        return await Model.findOne({
            name: name,
            parentFolderId: parentFolderId ?? null
        }, null, options)
    }
    // async parentFolderInfo(parentFolderId: string, options?: SessionOption) {
    //     if (!parentFolderId) return null;

    //     return await Model.aggregate([
    //         {
    //             $match: {
    //                 _id : parentFolderId,
    //             },

    //             $lookup : {
    //                 from : AccessModelName,
    //                 let: {rootId : parentFolderId},
    //                 pipeline : [
    //                     {
    //                         $match : {
    //                             $expr : {$eq : ["$resourceId" , "$$rootId"]}
    //                         }
    //                     }
    //                 ],
    //                 as : "access"
    //             }
    //         }
    //     ], options)
    // }
    async createFolder(payload: CreateDataType, options?: SessionOption) {
        return await Model.create([{
            name: payload?.name,
            createdBy: payload?.createdBy,
            lastModified: new Date(),
            dataType: payload.type,
            parentFolderId: payload?.parentFolderId ?? null
        }], options)
    }

    async getFolders(folderId?: string, userId: string) {

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

        // TODO; check which folder this user has access to


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

    async findOne(filters: Partial<Record<keyof (FilesAndFolderSchemaType & { _id: string }), any>>) {
        return await Model.findOne(filters)
    }


    async updateName(_id: string, name: string) {
        return await Model.findOneAndUpdate({ _id }, { name })
    }

}