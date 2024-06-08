import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { File } from "buffer";
import { startSession } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { extname } from "path";

export const POST = async (req: NextRequest) => {
    const mongoSession = await startSession()
    const service = new ResourceService();
    const response = new ApiResponse()

    const formData = await req?.formData?.();
    const file = formData.get("file");
    const folderId = formData.get("folderId") as string;
    const totalSize = parseInt(formData.get("totalSize") as string)
    const chunkIndex = parseInt(formData.get("chunkIndex") as string)
    const totalChunks = parseInt(formData.get("totalChunks") as string)
    const uploadId = formData.get("uploadId") as string

    if (chunkIndex > 0 && !uploadId) {
        return response.status(400).send("Please provide uploadId!")
    }

    const name = formData.get("name") as string;
    let fileName = name

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        if (!file || !(file instanceof File)) {
            return response.status(400).send("No files received.")
        }

        await connectDB()
        mongoSession.startTransaction()

        const hasAccess = await service.checkAccess(String(user._id), {
            resourceId: folderId ?? "",
            accessType: ACCESS_TYPE.WRITE
        }, { session: mongoSession })


        if (!hasAccess?.success) {
            //TODO: redirect to another page not found / no permissions
            return response.status(403).send("Unauthorized")
        }


        const buffer = Buffer.from(await file.arrayBuffer())
        const hasFile = await service.findResourceByName(fileName, folderId, { session: mongoSession })

        if (hasFile) {
            const ext = extname(fileName);
            const name = fileName.split(ext)?.[0]
            fileName = `${name} (1)${ext}`;
        }

        const awsUploadId = await service.upload({
            file: buffer,
            fileName: fileName,
            createdBy: String(user._id),
            parentFolderId: folderId,
            size: totalSize,
            userId: String(user._id),
            chunkIndex,
            totalChunks,
            uploadId
        }, { session: mongoSession });

        await mongoSession.commitTransaction()
        return response.status(201).send({
            uploadId: awsUploadId,
            message: "Uploaded"
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        await mongoSession.abortTransaction()
        return response.status(500).send(err?.message)
    }
    finally {
        console.log("Run finally")
        await mongoSession.endSession()
    }
};