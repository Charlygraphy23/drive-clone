import { connectDB } from "@/app/lib/database/db";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import { SignupSchemaValidator } from "../../_validation/user.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()

    try {
        const data = await req.json();
        const service = new UserService()
        const isValid = await SignupSchemaValidator.isValid(data)

        if (!isValid) return response.status(422).send("Invalid email or name!")

        const { email, firstName, lastName } = data;

        await connectDB();
        // TODO: create a free free storage with subscription

        const hasUser = await service.findByEmail(email)

        if (hasUser) return response.status(400).send("This email is already registered!");

        await service.createUserWithoutPass({
            email,
            firstName,
            lastName,
        })

        return response.status(200).send("Done")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}