import { PasswordChangeFormSchema } from "@/app/interfaces/index.interface"
import { authOptions } from "@/app/lib/authConfig"
import { UserService } from "@/app/lib/database/services/user.service"
import { ApiResponse } from "@/app/utils/response"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"
import { SignupSchemaValidator } from "../_validation/user.validation"

export const GET = async (_req: NextRequest) => {
    const service = new UserService();
    const response = new ApiResponse()
    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        return await service.findById(String(user._id));
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}


export const PUT = async (_req: NextRequest) => {
    const service = new UserService();
    const response = new ApiResponse()
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

        await service.updateProfile(String(user._id), {
            firstName,
            lastName,
            email
        });

        revalidateTag("user-details")
        return response.status(200).send("Updated")
    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}

export const POST = async (_req: NextRequest) => {
    const service = new UserService();
    const response = new ApiResponse()
    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const body = await _req.json();
        const { newPassword, confirmPassword } = body

        const isValid = await PasswordChangeFormSchema.isValid({
            newPassword, confirmPassword
        })

        if (!isValid) return response.status(422).send("Invalid password")

        await service.updatePassword(String(user._id), newPassword);
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}
