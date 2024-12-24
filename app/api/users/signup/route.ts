import { NodemailerClient } from "@/app/email";
import { connectDB } from "@/app/lib/database/db";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import mongoose from "mongoose";
import { SignupSchemaValidator } from "../../_validation/user.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()
    const subscriptionService = new SubscriptionService()

    try {
        await connectDB();
        const session = await mongoose.startSession()

        try {
            session.startTransaction();

            const data = await req.json();
            const service = new UserService()
            const isValid = await SignupSchemaValidator.isValid(data)

            if (!isValid) return response.status(422).send("Invalid email or name!")

            const { email, firstName, lastName } = data;
            console.log("Validated")
            console.log("Transaction Started")

            const hasUser = await service.findByEmail(email, "", { session })

            if (hasUser) return response.status(400).send("This email is already registered!");
            console.log("hasUser")
            const [user, generatedPassword] = await service.createUserWithoutPass({
                email,
                firstName,
                lastName,
            }, { session })
            console.log("UserCreated")

            await subscriptionService.activeInitialFreeSubscription(String(user?._id), { session })

            const mailClient = new NodemailerClient();
            const origin = new URL(req.url).origin
            const template = await mailClient.signupTemplate({
                name: `${firstName} ${lastName}`,
                username: email,
                password: generatedPassword,
                origin,
            })

            await template.send({
                to: email,
                subject: "Congratulations! Successful Login"
            })
            await session.commitTransaction()
            return response.status(200).send("Done")

        }
        catch (_err: unknown) {
            const err = _err as { message: string }
            console.error("Error - ", err)
            await session.abortTransaction()
            return response.status(500).send(err?.message)
        }
        finally {
            await session.endSession()
        }
    } catch (err: any) {
        return response.status(500).send(err?.message ?? "Something went wrong")
    }

}