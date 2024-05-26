import { connectDB } from "@/app/lib/database/db";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { CRYPTO } from "@/app/utils/crypto";
import { ApiResponse } from "@/app/utils/response";
import mime from "mime-types";
import { extname } from "path";

export const GET = async (req: Request, { params }: { params: { encryptedKey: string } }) => {
    const response = new ApiResponse()
    const service = new ResourceService()
    console.log(params)

    try {
        const key = CRYPTO.decryptTextFromBase64(params?.encryptedKey ?? "")

        if (!key) return response.status(400).send("Invalid url")


        await connectDB()

        const byteArray = await service.getResourceFromS3({ key })

        if (!byteArray) return response.status(422).send("No content!")

        const fileName = key?.split('/').pop() ?? "";
        const fileExtention = extname(fileName);

        let hasMimeType = mime.lookup(fileExtention)

        if (!hasMimeType) {
            hasMimeType = "text/plain"
        }

        return response.status(200).setHeaders({
            "Content-Type": hasMimeType
        }).send(byteArray)
    } catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}