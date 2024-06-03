import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { AccessService } from "@/app/lib/database/services/access.service";
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
    const accessService = new AccessService()

    try {
        const session = await getServerSession(authOptions)
        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        const formData = await req?.formData?.();
        const file = formData.get("file");
        const folderId = formData.get("folderId") as string;


        if (!file || !(file instanceof File)) {
            return response.status(400).send("No files received.")
        }

        let fileName = file?.name

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

        const hasFile = await service.findResourceByName(fileName, folderId, { session: mongoSession })

        if (hasFile) {
            const ext = extname(fileName);
            const name = fileName.split(ext)?.[0]
            fileName = `${name} (1)${ext}`;
        }


        const [res] = await service.upload({
            file: file,
            fileName: fileName,
            createdBy: String(user._id),
            parentFolderId: folderId,
        }, { session: mongoSession });

        const fileInfo = res?.toJSON()
        await accessService.createWithParent({
            userId: String(user._id), parentFolderId: folderId, resourceId: fileInfo?._id
        }, { session: mongoSession })

        await mongoSession.commitTransaction()
        return response.status(200).send("Updated")

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