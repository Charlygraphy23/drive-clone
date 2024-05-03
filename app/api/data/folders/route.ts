import { UpdateFolderNamePayload } from "@/app/_apis_routes/filesAndFolder";
import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { FilesAndFolderService } from "@/app/lib/database/services/filesAndFolder.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { UpdateNamePayloadSchema } from "../../_validation/data.validation";

const service = new FilesAndFolderService()

export const GET = async () => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(403).send("Unauthorized")

        await connectDB();

        const folders = await service.getFolders()

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

        const folderExistWithName = await service.findOne({ name: updatedName, parentFolderId: folderData?.parentFolderId })

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