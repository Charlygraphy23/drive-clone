import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { FilesAndFolderService } from "@/app/lib/database/services/filesAndFolder.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { DataCreateSchemaValidator } from "../../_validation/data.validation";

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

        await service.createFolder({
            name,
            createdBy,
            type,
            parentFolderId
        })

        return response.status(200).send("Done")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}