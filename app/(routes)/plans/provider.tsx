"use client"


import { getPlans } from '@/app/_actions/plans';
import { GetPlanWithBenefitType } from '@/app/lib/database/interfaces/plan.interface';
import { useAppStore } from '@/app/store';
import { addPlans } from '@/app/store/actions/plan.actions';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

const PlanStateProvider = ({ children }: PropsWithChildren) => {

    const [loading, setLoading] = useState(false)
    const initializeData = useRef<boolean>(false);
    const store = useAppStore()

    const handleInitialDataLoad = useCallback(async () => {
        const plans = (await getPlans()) as GetPlanWithBenefitType[]
        store.dispatch(addPlans(plans))
        setLoading(false)
    }, [store])


    useEffect(() => {
        if (!initializeData?.current) {
            setLoading(true)
            handleInitialDataLoad()

            initializeData.current = true
        }
    }, [handleInitialDataLoad])

    return (
        <>{children}</>
    )
}

export default PlanStateProvider