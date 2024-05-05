import { UpdateFolderNamePayload } from "@/app/_apis_routes/filesAndFolder";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { AccessService } from "@/app/lib/database/services/access.service";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { startSession } from "mongoose";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { DataCreateSchemaValidator, MongoIdSchemaValidation, UpdateNamePayloadSchema } from "../../_validation/data.validation";

const service = new ResourceService()
const accessService = new AccessService()

export const GET = async (folderId?: string) => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        await connectDB();

        if (folderId) {
            const isValidId = MongoIdSchemaValidation.isValid(folderId)

            if (!isValidId) return response.status(422).send("Invalid folderId")

            const hasAccess = await service.checkAccess(user.id, {
                resourceId: folderId ?? ""
            })

            if (!hasAccess?.success) {
                //TODO: redirect to another page not found / no permissions
                return response.status(403).send("Unauthorized")
            }
        }


        const folders = await service.getFolders(user.id, folderId)
        return response.status(200).send({
            data: folders
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}

export const PATCH = async (req: NextRequest) => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await req?.json()
        const { folderId, updatedName } = body as UpdateFolderNamePayload;

        const isValid = await UpdateNamePayloadSchema.isValid(body, { abortEarly: false })

        if (!isValid) return response.status(422).send("Invalid Data")

        await connectDB();

        const hasAccess = await service.checkAccess(user.id, {
            resourceId: folderId ?? "",
            accessType: ACCESS_TYPE.WRITE
        })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const foundFolder = await service.findOne({ _id: folderId })

        if (!foundFolder) return response.status(422).send("No folder found!")

        const folderData = foundFolder.toJSON()

        const folderExistWithName = await service.findOne({ name: updatedName, parentFolderId: folderData?.parentFolderId, _id: { $ne: folderId } })

        if (folderExistWithName) return response.status(422).send("Folder Exists with the name!")

        await service.updateName(folderId, updatedName)

        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}

export const POST = async (req: NextRequest) => {
    const response = new ApiResponse()
    const mongoSession = await startSession()

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

        const hasAccess = await service.checkAccess(user.id, {
            resourceId: parentFolderId ?? "",
            accessType: ACCESS_TYPE.WRITE
        }, { session: mongoSession })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const folderExists = await service.findFolderByName(name, parentFolderId, { session: mongoSession })

        if (folderExists) return response.status(400).send("A folder is already exists with this name");

        const [res] = await service.createFolder({
            name,
            createdBy: user.id,
            type,
            parentFolderId
        }, { session: mongoSession })

        const folderInfo = res?.toJSON()
        await accessService.createWithParent({
            userId: user.id, parentFolderId, resourceId: folderInfo?._id
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