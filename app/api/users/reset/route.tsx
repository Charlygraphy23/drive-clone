import { connectDB } from "@/app/lib/database/db";
import { CryptoHandler, JWTHandler } from "@/app/lib/database/helper/user.helper";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import { ResetPasswordSchemaValidator } from "../../_validation/user.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()

    try {
        await connectDB();

        try {

            const data = await req.json();
            const service = new UserService()
            const isValid = await ResetPasswordSchemaValidator.isValid(data)

            if (!isValid) return response.status(422).send("Invalid email")

            const { confirmPassword, hash } = data;
            const decodedString = decodeURIComponent(hash)
            const decryptedText = CryptoHandler.decrypt(decodedString);
            console.log("decryptedText ", decryptedText)

            const isJwtValid = JWTHandler.verify<{
                userId: string;
                email: string;
                firstName: string
            } | boolean>(decryptedText)

            if (!isJwtValid) return response.status(400).send("Session has expired! Please try again!")

            const userId = isJwtValid?.userId;
            console.log("userId ", userId)


            if (!userId) return response.status(400).send("Invalid user!")
            const hasUser = await service.findById(userId)
            console.log("hasUser", hasUser)

            if (!hasUser) return response.status(400).send("Your not registered!");

            await service.updatePassword(userId, confirmPassword)

            return response.status(200).send("Done")
        }
        catch (_err: unknown) {
            const err = _err as { message: string }
            console.error("Error - ", err)
            return response.status(500).send(err?.message)
        }

    } catch (err: any) {
        return response.status(500).send(err?.message ?? "Something went wrong")
    }

}