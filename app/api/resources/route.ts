import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { ResourceService } from "@/app/lib/database/services/resource.service";
import { ApiResponse } from "@/app/utils/response";
import { getServerSession } from "next-auth/next";
import { MongoIdSchemaValidation } from "../_validation/data.validation";

const service = new ResourceService()

export const GET = async (folderId?: string) => {
    const response = new ApiResponse()

    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        await connectDB();

        if (folderId) {
            const isValidId = MongoIdSchemaValidation.isValid(folderId)

            if (!isValidId) return response.status(422).send("Invalid folderId")

            const hasAccess = await service.checkAccess(user.id, {
                resourceId: folderId ?? ""
            })

            if (!hasAccess?.success) {
                //TODO: redirect to another page not found / no permissions
                return response.status(403).send("Unauthorized")
            }
        }


        const folders = await service.getFolders(user.id, folderId)
        return response.status(200).send({
            data: folders
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}