"use client"

import { GetPlanWithBenefitType } from "@/app/lib/database/interfaces/plan.interface";
import { SubscriptionSchemaType } from "@/app/lib/database/interfaces/subscription.interface";
import { useAppSelector } from "@/app/store";
import { User } from "next-auth";
import style from "../style.module.scss";
import PlanCard from "./plan";

type Props = {
    subscription?: { _id: string } & SubscriptionSchemaType | null;
    user?: User
}

const PlanList = ({ subscription, user }: Props) => {
    const { data: plans } = useAppSelector(state => state?.plan);
    const isActivated = (plan: GetPlanWithBenefitType) => {
        if (subscription && subscription?.isActive) {
            return String(plan._id) === String(subscription?.planId)
        }
        return false
    }

    return (
        <>
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
                    isAuthenticated={!!user}
                    isFree={plan?.isFree}
                />)}

            </div></>
    )
}

export default PlanList