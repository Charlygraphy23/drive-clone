import { unstable_cache } from "next/cache";
import { connectDB } from "../lib/database/db";
import { BenefitsSchemaType } from "../lib/database/interfaces/benefits.interface";
import { PlanSchemaType } from "../lib/database/interfaces/plan.interface";
import { SubscriptionSchemaType } from "../lib/database/interfaces/subscription.interface";
import { PlanService } from "../lib/database/services/plan.service";
import { SubscriptionService } from "../lib/database/services/subscription.service";

export const getSubscriptionInfo = unstable_cache(async (userId: string) => {
    "use server"

    if (!userId) return null;

    await connectDB()
    const subscriptionService = new SubscriptionService();
    const hasSubscription = await subscriptionService.getUserSubscription(userId)
    if (!hasSubscription) return null;

    return JSON.parse(JSON.stringify(hasSubscription)) as { _id: string } & SubscriptionSchemaType
}, ["subscription"], {
    tags: ["subscription"]
})


export const getPlans = unstable_cache(async () => {
    "use server"

    await connectDB()
    const planService = new PlanService()
    const data = (await planService.getAllPlans())
    const plans = JSON.parse(JSON.stringify(data)) as Array<{ _id: string, benefits: BenefitsSchemaType } & PlanSchemaType>
    return plans
}, ["plans"], {
    tags: ["plans"]
})