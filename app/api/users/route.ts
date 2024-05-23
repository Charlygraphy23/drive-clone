import { authOptions } from "@/app/lib/authConfig"
import { UserService } from "@/app/lib/database/services/user.service"
import { ApiResponse } from "@/app/utils/response"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"
import { SignupSchemaValidator } from "../_validation/user.validation"

const service = new UserService();
const response = new ApiResponse()


export const PUT = async (_req: NextRequest) => {

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await _req.json();
        const { firstName, lastName, email } = body

        const isValid = await SignupSchemaValidator.isValid({
            firstName, lastName, email
        })

        if (!isValid) return response.status(422).send("Invalid email or name!")

        return await service.updateProfile(String(user._id), {
            firstName,
            lastName,
            email
        });

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}