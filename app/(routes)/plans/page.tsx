import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { BenefitsSchemaType } from "@/app/lib/database/interfaces/benefits.interface";
import { PlaneSchemaType } from "@/app/lib/database/interfaces/plan.interface";
import { SubscriptionSchemaType } from "@/app/lib/database/interfaces/subscription.interface";
import { PlanService } from "@/app/lib/database/services/plan.service";
import { SubscriptionService } from "@/app/lib/database/services/subscription.service";
import { getServerSession } from "next-auth";
import PlanCard from "./components/plan";
import style from "./style.module.scss";

const PlanPage = async () => {
    const session = await getServerSession(authOptions);
    const plans = await getPlans()
    const user = session?.user
    const subscription = await getSubscriptionInfo(String(user?._id ?? ""));

    const isActivated = (plan: {
        _id: string;
        benefits: BenefitsSchemaType;
    } & PlaneSchemaType) => {
        if (subscription && subscription?.isActive) {
            return String(plan._id) === String(subscription?.planId)
        }
        return false
    }


    return (
        <main className={style?.wrapper} style={!session?.user ? { height: "100vh" } : {}}>
            <h1>Our Plans</h1>
            <p>These are all the plans having it's own benefits</p>


            <div className={style?.plans}>
                {plans?.map(plan => <PlanCard
                    key={plan._id}
                    benefits={plan.benefits}
                    description={plan.description}
                    isActivated={isActivated(plan)}
                    isPopular={plan.isPopular}
                    title={plan?.title}
                    price={plan?.price}
                    isAuthenticated={!!session?.user}
                />)}

            </div>

        </main>
    )
}

export default PlanPage


const getSubscriptionInfo = async (userId: string) => {
    "use server"

    if (!userId) return null;

    await connectDB()
    const subscriptionService = new SubscriptionService();
    const hasSubscription = await subscriptionService.getUserSubscription(userId)
    if (!hasSubscription) return null;

    return JSON.parse(JSON.stringify(hasSubscription)) as { _id: string } & SubscriptionSchemaType
}


const getPlans = async () => {
    "use server"

    await connectDB()
    const planService = new PlanService()
    const data = (await planService.getAllPlans())
    const plans = JSON.parse(JSON.stringify(data)) as Array<{ _id: string, benefits: BenefitsSchemaType } & PlaneSchemaType>
    return plans
}