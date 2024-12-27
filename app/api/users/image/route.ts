import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import { File } from "buffer";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {

    const service = new UserService();
    const response = new ApiResponse()
    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const formData = await req?.formData?.();
        const file = formData.get("image");

        if (!file || !(file instanceof File)) {
            return response.status(400).send("No files received.")
        }


        if (file.size > 4500000) {
            return response.status(400).send("Image size is too big!")
        }

        await connectDB()

        await service.updateProfileImage(file, String(user?._id));
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }
};