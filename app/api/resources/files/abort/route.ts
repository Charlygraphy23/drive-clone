import { authOptions } from "@/app/lib/authConfig"
import { connectDB } from "@/app/lib/database/db"
import { ResourceService } from "@/app/lib/database/services/resource.service"
import { ApiResponse } from "@/app/utils/response"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    const service = new ResourceService()
    const response = new ApiResponse()


    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await req?.json()
        const { s3UploadId, fileName } = body;
        console.log("Payload ", body)

        if (!s3UploadId || !fileName) return response.status(422).send("Invalid Data")

        await connectDB();
        const key = `${user?._id}/${fileName}`
        await service.abortFileUpload(key, s3UploadId)
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}
