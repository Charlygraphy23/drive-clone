import { connectDB } from "@/app/lib/database/db";
import { CryptoHandler, JWTHandler } from "@/app/lib/database/helper/user.helper";
import { ResetToken } from "@/app/lib/database/models/reset-token";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import mongoose from "mongoose";
import { ResetPasswordSchemaValidator } from "../../_validation/user.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()

    try {
        await connectDB();
        const session = await mongoose.startSession()
        try {
            session.startTransaction();
            const data = await req.json();
            const service = new UserService()
            // const resetToeknService = new ResetTokenService
            const isValid = await ResetPasswordSchemaValidator.isValid(data)

            if (!isValid) return response.status(422).send("Invalid email")

            const { confirmPassword, hash } = data;
            const decodedString = decodeURIComponent(hash)
            const decryptedText = CryptoHandler.decrypt(decodedString);

            const isJwtValid = JWTHandler.verify<{
                userId: string;
                email: string;
                firstName: string
            } | boolean>(decryptedText)

            if (!isJwtValid) return response.status(400).send("Session has expired! Please try again!")

            const userId = isJwtValid?.userId;

            if (!userId) return response.status(400).send("Invalid user!")

            const hasUser = await service.findById(userId, { session })
            if (!hasUser) return response.status(400).send("Your not registered!");

            const hasToken = await ResetToken.findOne({
                userId: hasUser?._id
            }, undefined, { session });

            if (!hasToken || !hasToken?.isActive) return response.status(400).send("Session has expired! Please try again!")

            await service.updatePassword(userId, confirmPassword, { session })
            await ResetToken.findOneAndUpdate({
                userId: hasUser?._id
            }, {
                isActive: false
            }, { session })

            await session.commitTransaction()
            return response.status(200).send("Done")
        }
        catch (_err: unknown) {
            const err = _err as { message: string }
            console.error("Error - ", err)
            await session.abortTransaction()
            return response.status(500).send(err?.message)
        } finally {
            await session.endSession()
        }

    } catch (err: any) {
        return response.status(500).send(err?.message ?? "Something went wrong")
    }

}