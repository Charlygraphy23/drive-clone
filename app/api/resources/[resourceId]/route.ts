import { authOptions } from "@/app/lib/authConfig"
import { connectDB } from "@/app/lib/database/db"
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface"
import { ResourceService } from "@/app/lib/database/services/resource.service"
import { ApiResponse } from "@/app/utils/response"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"



export const GET = async (req: NextRequest, { params }: { params: { resourceId: string } }) => {
    const response = new ApiResponse()
    const service = new ResourceService()
    try {

        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const resourceId = params?.resourceId;

        if (!resourceId) return response.status(422).send("Please provide a resourceId ID");

        const isValid = mongoose.Types.ObjectId.isValid(resourceId);
        if (!isValid) return response.status(422).send("Invalid FolderId provided")

        await connectDB();

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: resourceId ?? "",
        })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        const data = await service.folderInfo(resourceId, String(user._id))

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

export const PATCH = async (req: NextRequest, { params }: { params: { resourceId: string } }) => {
    const response = new ApiResponse()
    const service = new ResourceService()
    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user
        const resourceId = params?.resourceId;

        if (!resourceId) return response.status(422).send("Please provide a resourceId ID");

        const isValid = mongoose.Types.ObjectId.isValid(resourceId);
        if (!isValid) return response.status(422).send("Invalid FolderId provided")

        await connectDB();

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: resourceId ?? "",
            accessType: ACCESS_TYPE.WRITE
        })

        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }

        await service.softDeleteResourceById(resourceId)
        return response.status(200).send("Deleted")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
}