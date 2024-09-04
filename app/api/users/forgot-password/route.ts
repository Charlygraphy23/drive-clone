import { NodemailerClient } from "@/app/email";
import { connectDB } from "@/app/lib/database/db";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import { ForgotPasswordSchemaValidator } from "../../_validation/user.validation";

export const POST = async (req: Request) => {
    const response = new ApiResponse()

    try {
        await connectDB();

        try {

            const data = await req.json();
            const service = new UserService()
            const isValid = await ForgotPasswordSchemaValidator.isValid(data)

            if (!isValid) return response.status(422).send("Invalid email")

            const { email } = data;
            const hasUser = await service.findByEmail(email)

            if (!hasUser) return response.status(400).send("Your not registered");

            const hash = service.generateForgotPasswordLink(hasUser);
            const origin = new URL(req?.url).origin;
            const url = new URL(`${origin}/reset-password/${hash}`);

            const mailClient = new NodemailerClient()
            const template = await mailClient.forgotTemplate({
                emailExpiredTime: 3,
                origin,
                resetLink: url.toString(),
            })

            template.send({
                to: email,
                subject: "Reset Your Password"
            })

            return response.status(200).send({
                message: "Email sent successfully",
                data: url
            })
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