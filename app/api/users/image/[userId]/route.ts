import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";


export const GET = async (_req: NextRequest, { params }: { params: { userId: string } }) => {
    const service = new UserService();
    const response = new ApiResponse()
    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")

        const userId = params?.userId;

        if (!userId) return response.status(422).send("Invalid url")

        await connectDB()

        const array = await service.getProfileImage(String(userId));

        return response.setHeaders({
            "Content-Type": "image/png"
        }).send(array, 200, true)

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
};