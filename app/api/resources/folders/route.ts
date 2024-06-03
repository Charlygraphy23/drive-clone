import { UpdateFolderNamePayload } from "@/app/_apis_routes/resources";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { AccessService } from "@/app/lib/database/services/access.service";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { startSession } from "mongoose";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { DataCreateSchemaValidator, UpdateNamePayloadSchema } from "../../_validation/data.validation";


export const PATCH = async (req: NextRequest) => {
    const service = new ResourceService()
    const response = new ApiResponse()


    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await req?.json()
        const { id, updatedName } = body as UpdateFolderNamePayload;

        const isValid = await UpdateNamePayloadSchema.isValid(body, { abortEarly: false })

        if (!isValid) return response.status(422).send("Invalid Data")

        await connectDB();

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: id ?? "",
            accessType: ACCESS_TYPE.WRITE
        })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const foundFolder = await service.findOne({ _id: id })

        if (!foundFolder) return response.status(422).send("No folder found!")

        const folderData = foundFolder.toJSON()

        const folderExistWithName = await service.findOne({ name: updatedName, parentFolderId: folderData?.parentFolderId, _id: { $ne: id } })

        if (folderExistWithName) return response.status(422).send("Folder Exists with the name!")

        await service.updateName(id, updatedName)

        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}

export const POST = async (req: NextRequest) => {
    const mongoSession = await startSession()
    const accessService = new AccessService()
    const response = new ApiResponse()


    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")

        const user = session?.user

        const data = await req.json();
        const { name, type, parentFolderId = null } = data;

        const service = new ResourceService()
        const isValid = await DataCreateSchemaValidator.isValid(data, {
            abortEarly: false,
            context: { parentFolderId }
        })
        console.log("parentFolderId - ", parentFolderId)

        if (!isValid) return response.status(422).send("Invalid data!")

        await connectDB();
        mongoSession.startTransaction()

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: parentFolderId ?? "",
            accessType: ACCESS_TYPE.WRITE
        }, { session: mongoSession })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const folderExists = await service.findResourceByName(name, parentFolderId, { session: mongoSession })

        if (folderExists) return response.status(400).send("A folder is already exists with this name");

        const [res] = await service.createFolder({
            name,
            createdBy: String(user._id),
            type,
            parentFolderId
        }, { session: mongoSession })

        const folderInfo = res?.toJSON()
        await accessService.createWithParent({
            userId: String(user._id), parentFolderId, resourceId: folderInfo?._id
        }, { session: mongoSession })

        await mongoSession.commitTransaction()
        return response.status(200).send({
            folderId: folderInfo?._id
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        await mongoSession.abortTransaction()
        return response.status(500).send(err?.message)
    }
    finally {
        console.log("Run finally")
        await mongoSession.endSession()
    }

}
