import { authOptions } from "@/app/lib/authConfig"
import { connectDB } from "@/app/lib/database/db"
import { ResourceService } from "@/app/lib/database/services/resource.service"
import { ApiResponse } from "@/app/utils/response"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest, { params }: { params: { folderId: string } }) => {
    const response = new ApiResponse()
    const service = new ResourceService()
    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const folderId = params?.folderId;

        if (!folderId) return response.status(422).send("Please provide a folder ID");

        const isValid = mongoose.Types.ObjectId.isValid(folderId);
        if (!isValid) return response.status(422).send("Invalid FolderId provided")

        await connectDB();

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: folderId ?? "",
        })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const data = await service.folderInfo(folderId, String(user._id))

        return response.status(200).send({
            data
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
}