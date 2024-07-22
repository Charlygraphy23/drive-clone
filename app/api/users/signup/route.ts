import { connectDB } from "@/app/lib/database/db";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import mongoose from "mongoose";
import { SignupSchemaValidator } from "../../_validation/user.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()
    const subscriptionService = new SubscriptionService()

    const session = await mongoose.startSession()

    try {
        const data = await req.json();
        const service = new UserService()
        const isValid = await SignupSchemaValidator.isValid(data)

        if (!isValid) return response.status(422).send("Invalid email or name!")

        const { email, firstName, lastName } = data;

        await connectDB();
        session.startTransaction()
        // TODO: create a free free storage with subscription

        const hasUser = await service.findByEmail(email, "", { session })

        if (hasUser) return response.status(400).send("This email is already registered!");

        const [user] = await service.createUserWithoutPass({
            email,
            firstName,
            lastName,
        }, { session })

        await subscriptionService.activeInitialFreeSubscription(user?._id, { session })
        return response.status(200).send("Done")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        await session.abortTransaction()
        return response.status(500).send(err?.message)
    }
    finally {
        session.endSession()
    }

}