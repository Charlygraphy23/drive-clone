import { authOptions } from "@/app/lib/authConfig"
import { UserService } from "@/app/lib/database/services/user.service"
import { ApiResponse } from "@/app/utils/response"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

export const GET = async (_req: NextRequest, { params }: { params: { email: string } }) => {
    const service = new UserService();
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const { email } = params
        const data = await service.fetchUserWithEmail(email, String(user._id));
        return response.status(200).send({ data })
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}