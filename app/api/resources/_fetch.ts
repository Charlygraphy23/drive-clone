import { authOptions } from "@/app/lib/authConfig"
import { connectDB } from "@/app/lib/database/db"
import { ResourceService } from "@/app/lib/database/services/resource.service"
import { getServerSession } from "next-auth"
import { MongoIdSchemaValidation } from "../_validation/data.validation"

const service = new ResourceService()

export const getResources = async (folderId?: string) => {
    try {
        const session = await getServerSession(authOptions)

        if (!session) return { message: "Un-authorized", status: 401 };
        const user = session.user

        await connectDB();

        if (folderId) {
            const isValidId = MongoIdSchemaValidation.isValid(folderId)

            if (!isValidId) return { message: "Invalid folderId", status: 422 };

            const hasAccess = await service.checkAccess(String(user._id), {
                resourceId: folderId ?? ""
            })

            if (!hasAccess?.success) {
                //TODO: redirect to another page not found / no permissions
                return { message: "Un-authorized", status: 403 };
            }
        }


        const folders = await service.getFolders(String(user._id), folderId)

        return { message: "Un-authorized", status: 200, data: folders };

    }
    catch (_err: unknown) {
        console.log(_err)
        throw _err
    }
}