import { getServerSession, User } from "next-auth";
import { unstable_cache } from "next/cache";
import { authOptions } from "../lib/authConfig";
import { connectDB } from "../lib/database/db";
import { UserService } from "../lib/database/services/user.service";

export const getUserInfo = unstable_cache(async () => {
    "use server"

    await connectDB()

    const session = await getServerSession(authOptions)
    if (!session) return null
    const userId = String(session.user?._id)

    const service = new UserService();
    const user = await service.findById(userId)
    const toObject = JSON.parse(JSON.stringify(user))
    toObject.imageUrl = `api/users/image/${userId}`
    return toObject as { _id: string } & User
}, ["user-details"], {
    tags: ["user-details"]
})