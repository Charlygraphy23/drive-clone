import { authOptions } from "@/app/lib/authConfig"
import { connectDB } from "@/app/lib/database/db"
import { AccessSchemaType } from "@/app/lib/database/interfaces/access.interface"
import { DATA_TYPE, FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces"
import { FilesAndFolderModel } from "@/app/lib/database/models/filesAndFolders"
import { ResourceService } from "@/app/lib/database/services/resource.service"
import { PipelineStage, SessionOption, Types } from "mongoose"
import { getServerSession } from "next-auth"
import { MongoIdSchemaValidation } from "../_validation/data.validation"



export const getResources = async (resourceId?: string, resourceType: DATA_TYPE | null = null, showDeleted = false, shared: "only" | "show" | "off" = "off", page?: number, limit?: number) => {
    const service = new ResourceService()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return { message: "Un-authorized", status: 401 };
        const user = session.user

        await connectDB();

        if (resourceId) {
            const isValidId = MongoIdSchemaValidation.isValid(resourceId)

            if (!isValidId) return { message: "Invalid folderId", status: 422 };

            const hasAccess = await service.checkAccess(String(user._id), {
                resourceId: resourceId ?? ""
            })

            if (!hasAccess?.success) {
                //TODO: redirect to another page not found / no permissions
                return { message: "Un-authorized", status: 403 };
            }
        }


        const resources = await service.getResources(String(user._id), resourceId, showDeleted, resourceType, shared, page, limit)

        return { message: "Fetched", status: 200, data: resources };

    }
    catch (_err: unknown) {
        console.log(_err)
        throw _err
    }
}

export const getListOfChildFoldersQuery = (folderId: string): PipelineStage[] => {
    return [
        {
            $match: {
                _id: new Types.ObjectId(folderId)
            }
        },

        // ? recursively lookup over folders and find the child folder
        {
            $graphLookup: {
                from: "files_and_folders",
                startWith: "$_id",
                connectFromField: "_id",
                connectToField: "parentFolderId",
                as: "children",
                depthField: "depth",
            }
        },


        {
            $project: {
                merged: {
                    $concatArrays: [["$$ROOT"], "$children"]
                },

            }
        },


        {
            $project: {
                "merged.children": 0
            }
        },

        // ? make children data as ROOT data
        {
            $unwind: {
                path: "$merged",
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $replaceRoot: {
                newRoot: "$merged"
            }
        },

        {
            $sort: { "depth": 1 } // Sort the results by depth
        },

        {
            $project: {
                name: 1,
                createdBy: 1,
                parentFolderId: 1,
                dataType: 1,
                depth: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: [{ $type: "$depth" }, "missing"] },
                                { $lte: ["$depth", null] }
                            ]
                        },
                        then: -1,
                        else: "$depth"
                    }
                }
            }
        },
    ]
}

export const getChildrenAccessListByFolderId = async (folderId: string, options?: SessionOption) => {

    const query = getListOfChildFoldersQuery(folderId)
    try {
        const data = await FilesAndFolderModel.aggregate([

            // ? get all the data of the folder by id
            ...query,
            // ? find all the access that a particular folder has
            {
                $lookup: {
                    from: "accesses",
                    let: { resourceId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$resourceId", "$$resourceId"]
                                }
                            }
                        },

                        {
                            $project: {
                                rootId: 1, createdFor: 1, accessType: 1, resourceId: 1, origin: 1
                            }
                        }
                    ],
                    as: "accesses"
                }
            },

        ], options)

        return data as ({ _id: string, accesses: ({ _id: string } & Pick<AccessSchemaType, "accessType" | "createdFor" | "resourceId" | "rootId" | "origin">)[] } & Pick<FilesAndFolderSchemaType, "createdBy" | "dataType" | "name" | "parentFolderId">)[]
    }
    catch (_err: unknown) {
        console.log(_err)
        throw _err
    }
}