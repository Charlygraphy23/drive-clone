import { UpdateAccessTypePayload } from "@/app/_apis_routes/resources";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_ORIGIN, ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { AccessService } from "@/app/lib/database/services/access.service";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import mongoose, { SessionOption } from "mongoose";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { RemoveAlertPayloadValidator, UpdateAccessPayloadValidator } from "../../_validation/access.validation";


const handleAccessManagement = (resourceId: string, updateAccessList: UpdateAccessTypePayload["accessList"] = [], deletedUserIds: string[] = [], options?: SessionOption) => {
    return new Promise(async (resolve, reject) => {
        try {
            const service = new AccessService()
            const folders = await service.getAllChildFoldersWithAccess(resourceId, options)


            console.log("Accesses Needs to be updated fromAPI ", updateAccessList)
            console.log("Accesses Needs to be deleted for User fromAPI ", deletedUserIds)

            if (updateAccessList?.length) {
                let rootAccessId: string | null = null

                for await (const folder of folders) {
                    const accessListOfDB = folder?.accesses ?? [];
                    console.log("Pick - folder ", folder?._id)
                    console.log("Pick - access ", accessListOfDB)



                    for await (const accesses of updateAccessList) {
                        const hasAccess = accessListOfDB.find(a => a?.createdFor?.toString() === accesses?.createdFor)
                        console.log("Local Access -  ", accesses)
                        console.log("Find - hasAccess ", hasAccess)

                        if (hasAccess) {
                            const accessId = hasAccess?._id?.toString() ?? "";
                            console.log("Find - accessId ", accessId)

                            await service.updateById(accessId, {
                                accessType: accesses?.accessType
                            })
                        }
                        else {
                            const accessData = await service.create({
                                accessType: accesses?.accessType,
                                createdFor: accesses?.createdFor,
                                resourceId: folder?._id,
                                origin: rootAccessId ? ACCESS_ORIGIN.PARENT : ACCESS_ORIGIN.SELF,
                                rootId: rootAccessId ?? null
                            })
                            rootAccessId = accessData?._id?.toString()
                        }


                    }
                }
            }

            if (deletedUserIds.length) {

                for await (const folder of folders) {
                    const accessListOfDB = folder?.accesses ?? [];
                    console.log("Pick - folder ", folder?._id)
                    console.log("Pick - access ", accessListOfDB)

                    for await (const usersNeedToBeRemoved of deletedUserIds) {
                        const foundAccess = accessListOfDB.find(a => a?.createdFor?.toString() === usersNeedToBeRemoved)

                        if (!foundAccess) continue;
                        console.log("Deleting... ", foundAccess?._id)


                        const accessId = foundAccess?._id?.toString() ?? "";

                        await service.deleteById(accessId)
                    }
                }
            }
            resolve(true)
        }
        catch (error) {
            reject(error)
        }
    })

}

export const PATCH = async (req: NextRequest) => {
    const response = new ApiResponse()
    const resourceService = new ResourceService()
    const mongoSession = await mongoose.startSession()
    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await req?.json()
        const { accessList, resourceId, deletedUserIds } = body as UpdateAccessTypePayload

        const isValid = await UpdateAccessPayloadValidator.isValid(body, { abortEarly: false })
        console.log(isValid)

        if (!isValid) return response.status(422).send("Invalid Data")

        await connectDB();
        mongoSession.startTransaction()

        const hasAccess = await resourceService.checkAccess(String(user._id), {
            resourceId,
            accessType: ACCESS_TYPE.WRITE
        }, { session: mongoSession, withDeleted: true })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const hasResource = hasAccess.resource
        const accessListWithoutOwner = accessList.filter((access) => access.createdFor !== hasResource?.createdBy?.toString())

        await handleAccessManagement(resourceId, accessListWithoutOwner, deletedUserIds, { session: mongoSession, withDeleted: true })
        await mongoSession.commitTransaction()

        if (hasAccess?.resource?.dataType === DATA_TYPE.FILE) {
            revalidateTag("files")

        }
        else {
            revalidateTag("folders")
        }
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        await mongoSession.abortTransaction()
        return response.status(500).send(err?.message)
    }
    finally {
        await mongoSession.endSession()
    }

}

export const PUT = async (req: NextRequest,) => {
    const response = new ApiResponse()
    const resourceService = new ResourceService()
    const accessService = new AccessService()
    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await req?.json()

        const isValid = await RemoveAlertPayloadValidator.isValid(body, { abortEarly: false })

        if (!isValid) return response.status(422).send("Invalid Data")

        const { accessId, resourceId } = body

        await connectDB();
        const hasAccess = await resourceService.checkAccess(String(user._id), {
            resourceId,
        }, { withDeleted: true })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const accessData = hasAccess.data

        console.log("accessData ", accessData)

        if (String(accessData?._id) !== accessId) {
            return response.status(422).send("Unable to remove the resource")
        }

        await accessService.deleteById(accessId)

        if (hasAccess?.resource?.dataType === DATA_TYPE.FILE) {
            revalidateTag("files")

        }
        else {
            revalidateTag("folders")
        }
        return response.status(200).send("Deleted")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
}