

import { getChildrenAccessListByFolderId } from "@/app/api/resources/_fetch"
import { AccessModal } from "@app/lib/database/models/access"
import { ObjectId, SessionOption } from "mongoose"
import { ACCESS_ORIGIN, ACCESS_TYPE, AccessSchemaType, CreateAccess, CreateWithParentType } from "../interfaces/access.interface"

const Model = AccessModal

export class AccessService {


    async getAccessesByFolderId(folderId: string) {
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

    async create(payload: CreateAccess) {
        const { createdFor, resourceId, accessType } = payload
        return await Model.create({
            createdFor: createdFor,
            accessType,
            resourceId,
            origin: ACCESS_ORIGIN.SELF,
        })
    }

    async updateById(id: string, payload: Partial<AccessSchemaType>) {
        return await Model.findByIdAndUpdate({ _id: id }, payload)
    }


}