"use client"


import { getPlans } from '@/app/_actions/plans';
import { GetPlanWithBenefitType } from '@/app/lib/database/interfaces/plan.interface';
import { useAppStore } from '@/app/store';
import { addPlans } from '@/app/store/actions/plan.actions';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { Rings } from 'react-loader-spinner';

const PlanStateProvider = ({ children }: PropsWithChildren) => {

    const [loading, setLoading] = useState(true)
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
    console.log("Loading... ", loading)

    return (
        <>
            {loading ? <div className="w-100 d-flex justify-content-center align-items-center"><Rings
                height="50"
                width="50"
                color="black"
            /></div> : <>{children}</>}
        </>
    )
}

export default PlanStateProvider