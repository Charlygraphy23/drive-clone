import { connectDB } from "@/app/lib/database/db";
import { FilesAndFolderService } from "@/app/lib/database/services/filesAndFolder.service";
import { ApiResponse } from "@/app/utils/response";
import { DataCreateSchemaValidator } from "../../_validation/data.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()

    try {
        const data = await req.json();
        const service = new FilesAndFolderService()
        const isValid = await DataCreateSchemaValidator.isValid(data)

        if (!isValid) return response.status(422).send("Invalid data!")

        const { name, createdBy, type, parentFolderId } = data;

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