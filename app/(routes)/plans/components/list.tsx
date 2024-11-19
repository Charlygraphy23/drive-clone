"use client"

import { GetPlanWithBenefitType } from "@/app/lib/database/interfaces/plan.interface";
import { SubscriptionSchemaType } from "@/app/lib/database/interfaces/subscription.interface";
import { useAppSelector } from "@/app/store";
import { User } from "next-auth";
import { useMemo } from "react";
import style from "../style.module.scss";
import PlanCard from "./plan";

type Props = {
    subscription?: { _id: string } & SubscriptionSchemaType | null;
    user?: User
}

const PlanList = ({ subscription, user }: Props) => {
    const { data: plans } = useAppSelector(state => state?.plan);
    const anyActivePlan = useMemo(() => plans?.find(plan => plan.isActivated), [plans])
    const isActivated = (plan: { isActivated?: boolean } & GetPlanWithBenefitType) => {
        if (plan?.isActivated) return true
        if (subscription && subscription?.isActive) {
            return String(plan._id) === String(subscription?.planId)
        }
        return false
    }


    console.log("plans", subscription)

    return (
        <>
            <div className={style?.plans}>
                {plans?.map(plan => {

                    const active = isActivated(plan)
                    return <PlanCard
                        key={plan._id}
                        planId={plan._id}
                        benefits={plan.benefits}
                        description={plan.description}
                        isActivated={active}
                        isPopular={plan.isPopular}
                        title={plan?.title}
                        price={plan?.price}
                        isAuthenticated={!!user}
                        isFree={plan?.isFree}
                        user={user}
                        disabled={plan.isFree && ((subscription?.isActive && !subscription?.planDetails.isFree) || !!anyActivePlan)}
                    />
                })}

            </div></>
    )
}

export default PlanList