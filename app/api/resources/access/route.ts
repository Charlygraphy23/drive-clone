import { UpdateAccessTypePayload } from "@/app/_apis_routes/resources";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_ORIGIN, ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { AccessService } from "@/app/lib/database/services/access.service";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { UpdateAccessPayloadValidator } from "../../_validation/access.validation";


const handleAccessManagement = (resourceId: string, accessListFromAPI: UpdateAccessTypePayload["accessList"] = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const service = new AccessService()
            const folders = await service.getAllChildFoldersWithAccess(resourceId)

            let rootAccessId: string | null = null

            for await (const folder of folders) {
                const accessListOfDB = folder?.accesses ?? [];
                console.log("Pick - folder ", folder?._id)
                console.log("Pick - access ", accessListOfDB)



                for await (const accesses of accessListFromAPI) {
                    const hasAccess = accessListOfDB.find(a => a?.createdFor?.toString() === accesses?.createdFor)
                    console.log("Local Access -  ", accesses)
                    console.log("Find - hasAccess ", hasAccess)

                    if (hasAccess) {
                        const accessId = hasAccess?._id?.toString() ?? ""
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
            resolve(rootAccessId)
        }
        catch (error) {
            reject(error)
        }
    })

}

export const PATCH = async (req: NextRequest) => {
    const response = new ApiResponse()
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
        const accessListWithoutOwner = accessList.filter((access) => access.createdFor !== hasResource?.createdBy?.toString())
        console.log("accessListWithoutOwner", accessListWithoutOwner)
        console.log("hasResource", hasResource)

        await handleAccessManagement(resourceId, accessListWithoutOwner)
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}