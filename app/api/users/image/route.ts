import { authOptions } from "@/app/lib/authConfig";
import { UserService } from "@/app/lib/database/services/user.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";


interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

interface MulterRequest extends NextApiRequest {
    files: MulterFile[];
}

export const POST = async (req: NextRequest) => {

    const service = new UserService();
    const response = new ApiResponse()
    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return response.status(400).send("No files received.")
        }

        const buffer = Buffer.from(file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");

        await service.updatePassword(String(user._id), newPassword);
        return response.status(200).send("Updated")

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

};