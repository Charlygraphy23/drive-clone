import { User } from "next-auth";
import { unstable_cache } from "next/cache";
import { connectDB } from "../lib/database/db";
import { UserService } from "../lib/database/services/user.service";

export const getUserInfo = unstable_cache(async (userId: string) => {
    "use server"

    if (!userId) return null

    await connectDB()

    const service = new UserService();
    const user = await service.findById(userId)
    const toObject = JSON.parse(JSON.stringify(user))
    toObject.imageUrl = `api/users/image/${userId}`
    return toObject as { _id: string } & User
}, ["user-details"], {
    tags: ["user-details"]
})