import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { fileId: string } }) => {
    const service = new ResourceService();
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")

        const fileId = params?.fileId;

        if (!fileId) return response.status(422).send("Invalid url")

        await connectDB()

        const [stream, type] = await service.getFileStream(fileId);

        return response.setHeaders({
            "Content-Type": type as string,
        }).send(stream, 200, true)

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
};