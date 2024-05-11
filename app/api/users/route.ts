import { authOptions } from "@/app/lib/authConfig"
import { UserService } from "@/app/lib/database/services/user.service"
import { ApiResponse } from "@/app/utils/response"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

const service = new UserService();
const response = new ApiResponse()


export const POST = async (_req: NextRequest) => {

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await _req.json();
        const { email } = body
        const data = await service.fetchUserWithEmail(email, String(user._id));
        return response.status(200).send({ data })
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}