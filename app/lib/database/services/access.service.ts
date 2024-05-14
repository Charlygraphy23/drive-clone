

import { getChildrenAccessListByFolderId } from "@/app/api/resources/_fetch"
import { AccessModal } from "@app/lib/database/models/access"
import { FilterQuery, ObjectId, SessionOption, UpdateQuery } from "mongoose"
import { ACCESS_ORIGIN, ACCESS_TYPE, AccessSchemaType, CreateWithParentType } from "../interfaces/access.interface"

const Model = AccessModal

export class AccessService {


    async getAllChildFoldersWithAccess(folderId: string) {
        return await getChildrenAccessListByFolderId(folderId)
    }
    // createdFor + resourceId
    async findByUser(userId: string, filters: Partial<AccessSchemaType>, options?: SessionOption) {
        if (!userId || !filters?.resourceId) return null
        return await Model.findOne({ ...filters, createdFor: userId }, null, options)
    }

    async findAccessByParentResourceId(parentFolderId?: ObjectId | string | null, options?: SessionOption) {
        if (!parentFolderId) return []
        return await Model.find({ resourceId: parentFolderId }, null, options)
    }

    async createWithParent(payload: CreateWithParentType, options?: SessionOption) {
        const { userId, resourceId, parentFolderId } = payload
        // fetch parent permissions
        const parentAccess = (await this.findAccessByParentResourceId(parentFolderId, options)) ?? [];

        let accessData: AccessSchemaType[] = [] as AccessSchemaType[];

        // ? If no parent is there then create own access
        if (!parentAccess?.length) {
            accessData.push({
                accessType: ACCESS_TYPE.WRITE,
                origin: ACCESS_ORIGIN.SELF,
                createdFor: userId,
                resourceId,
            })
        }
        else {
            // ? If parent has some access then assign them to the children
            accessData = parentAccess.map(accessObj => {
                const access = accessObj.toJSON();
                return {
                    rootId: access?._id,
                    createdFor: access?.createdFor,
                    accessType: access?.accessType,
                    origin: ACCESS_ORIGIN.PARENT,
                    resourceId,
                }
            })
        }

        return await Model.create(accessData, options)
    }

    async create(payload: Partial<AccessSchemaType>) {
        const { createdFor, resourceId, accessType, origin = ACCESS_ORIGIN.SELF, rootId = null } = payload
        console.log("Payload created", payload)
        return await Model.create({
            createdFor,
            accessType,
            resourceId,
            origin,
            rootId
        })
    }

    async updateById(id: string, payload: UpdateQuery<Partial<AccessSchemaType>>) {
        return await Model.findByIdAndUpdate({ _id: id }, payload)
    }

    async updateMany(filters: FilterQuery<Partial<AccessSchemaType>>, payload: UpdateQuery<AccessSchemaType>) {
        return await Model.updateMany(filters, payload)
    }


}