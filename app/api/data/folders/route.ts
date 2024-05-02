import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { FilesAndFolderService } from "@/app/lib/database/services/filesAndFolder.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth/next";

export const GET = async () => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(403).send("Unauthorized")

        const service = new FilesAndFolderService()
        await connectDB();

        const folders = await service.getFolders()

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