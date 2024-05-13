import { UpdateAccessTypePayload } from "@/app/_apis_routes/resources";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { AccessService } from "@/app/lib/database/services/access.service";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { MongooseError } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { UpdateAccessPayloadValidator } from "../../_validation/access.validation";


export const PATCH = async (req: NextRequest) => {
    const response = new ApiResponse()
    const service = new AccessService()
    const resourceService = new ResourceService()
    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await req?.json()
        const { accessList, resourceId } = body as UpdateAccessTypePayload
        console.log("accessList", accessList)

        const isValid = await UpdateAccessPayloadValidator.isValid(body, { abortEarly: false })

        if (!isValid) return response.status(422).send("Invalid Data")

        await connectDB();

        const hasAccess = await resourceService.checkAccess(String(user._id), {
            resourceId,
            accessType: ACCESS_TYPE.WRITE
        })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const hasResource = hasAccess.resource
        const accessNotContainsOwnerId = accessList.filter((access) => access.createdFor !== hasResource?.createdBy?.toString())
        console.log("accessNotContainsOwnerId", accessNotContainsOwnerId)
        console.log("hasResource", hasResource)

        const accessListFromDB = await service.getAccessesByFolderId(resourceId)
        const promises = accessNotContainsOwnerId.map((access) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const findAccessWithResourceId = accessListFromDB.find(dbAccess => dbAccess?.resourceId?.toString() === resourceId && dbAccess?.createdFor?.toString() === access?.createdFor)
                    console.log("findAccessWithResourceId ", findAccessWithResourceId)

                    if (!findAccessWithResourceId) {

                        // FIXME: if resourceId === DB_RESOURCE_ID then it means that the permission has been created for that folder 
                        //and pass ther permission to its children

                        // ? Means this will be the new access to the resource
                        const data = await service.create({
                            accessType: access?.accessType,
                            createdFor: access?.createdFor,
                            resourceId
                        })
                        return resolve(data)
                    }

                    const data = await service.updateById(findAccessWithResourceId._id, { accessType: access.accessType })
                    return resolve(data)
                }
                catch (err) {
                    const error = err as MongooseError
                    reject(error)
                }
            })
        })

        await Promise.all(promises)
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}