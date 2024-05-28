import { connectDB } from "@/app/lib/database/db";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { CRYPTO } from "@/app/utils/crypto";
import { ApiResponse } from "@/app/utils/response";
import mime from "mime-types";
import { Types } from "mongoose";
import { extname } from "path";

export const GET = async (req: Request, { params }: { params: { encodedId: string } }) => {
    const response = new ApiResponse()
    const service = new ResourceService()

    try {
        let Id = "";

        try {
            Id = atob(params?.encodedId)
        }
        catch (err) {
            Id = ""
        }

        if (!Id) return response.status(400).send("Invalid url")

        await connectDB()

        const hasResource = await service.findOne({ _id: new Types.ObjectId(Id) })

        if (!hasResource || !hasResource?.key) {
            return response.status(400).send("Invalid url")
        }

        const key = CRYPTO.decryptTextFromBase64(hasResource?.key)

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