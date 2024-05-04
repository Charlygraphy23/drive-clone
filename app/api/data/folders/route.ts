import { UpdateFolderNamePayload } from "@/app/_apis_routes/filesAndFolder";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { FilesAndFolderService } from "@/app/lib/database/services/filesAndFolder.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { DataCreateSchemaValidator, MongoIdSchemaValidation, UpdateNamePayloadSchema } from "../../_validation/data.validation";

const service = new FilesAndFolderService()

export const GET = async (folderId?: string) => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(403).send("Unauthorized")

        if (folderId) {
            const isValidId = MongoIdSchemaValidation.isValid(folderId)

            if (!isValidId) return response.status(403).send("Invalid folderId")
        }

        await connectDB();

        const folders = await service.getFolders(folderId)

        console.log("Folder Found!")

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

        if (!session) return response.status(403).send("Unauthorized")

        const body = await req?.json()
        const { folderId, updatedName } = body as UpdateFolderNamePayload;

        const isValid = await UpdateNamePayloadSchema.isValid(body, { abortEarly: false })

        if (!isValid) return response.status(422).send("Invalid Data")

        await connectDB();

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

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(403).send("Unauthorized")

        const data = await req.json();
        const { name, createdBy, type, parentFolderId = null } = data;

        const service = new FilesAndFolderService()
        const isValid = await DataCreateSchemaValidator.isValid(data, {
            abortEarly: false,
            context: { parentFolderId }
        })
        console.log("isValid - ", isValid)

        if (!isValid) return response.status(422).send("Invalid data!")


        await connectDB();

        const folderExists = await service.findFolderByName(name, parentFolderId)

        if (folderExists) return response.status(400).send("A folder is already exists with this name");

        const res = await service.createFolder({
            name,
            createdBy,
            type,
            parentFolderId
        })

        const folderInfo = res?.toJSON()

        return response.status(200).send({
            folderId: folderInfo?._id
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}