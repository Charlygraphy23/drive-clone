import { authOptions } from "@/app/lib/authConfig"
import { connectDB } from "@/app/lib/database/db"
import { ResourceService } from "@/app/lib/database/services/resource.service"
import { SubscriptionService } from "@/app/lib/database/services/subscription.service"
import { ApiResponse } from "@/app/utils/response"
import { getServerSession } from "next-auth"

export const GET = async () => {
    const service = new ResourceService()
    const response = new ApiResponse()
    const subscriptionService = new SubscriptionService()


    try {
        const session = await getServerSession(authOptions)

        if (!session) return response.status(401).send("Unauthorized")
        const user = session.user

        await connectDB();

        const [activeSubscription, storageConsumed] = await Promise.all([
            subscriptionService.getUserSubscription(String(user?._id)),
            service.getStorageConsumedByUser(String(user?._id))
        ])
        const totalAvailableStorage = activeSubscription?.planDetails?.benefitDetails?.maxSize;

        return response.status(200).send({
            total: totalAvailableStorage,
            used: storageConsumed
        })

    }
    catch (_err: unknown) {
        const err = _err as { message: string }
        console.error("Error - ", err)
        return response.status(500).send(err?.message)
    }

}