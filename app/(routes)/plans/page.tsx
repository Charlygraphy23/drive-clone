import { getPlans, getSubscriptionInfo } from "@/app/_actions/plans";
import { authOptions } from "@/app/lib/authConfig";
import { BenefitsSchemaType } from "@/app/lib/database/interfaces/benefits.interface";
import { PlanSchemaType } from "@/app/lib/database/interfaces/plan.interface";
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
    } & PlanSchemaType) => {
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
                    planId={plan._id}
                    benefits={plan.benefits}
                    description={plan.description}
                    isActivated={isActivated(plan)}
                    isPopular={plan.isPopular}
                    title={plan?.title}
                    price={plan?.price}
                    isAuthenticated={!!session?.user}
                    isFree={plan?.isFree}
                />)}

            </div>

        </main>
    )
}

export default PlanPage


