"use client"

import { purchaseSubscription } from '@/app/_apis_routes/purchase';
import ButtonGroup from '@/app/components/buttonGroup';
import { BenefitsSchemaType } from '@/app/lib/database/interfaces/benefits.interface';
import { formatBytes } from '@/app/utils/index.utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import style from '../style.module.scss';

type Props = {
    isPopular?: boolean;
    isActivated?: boolean;
    price: number;
    title: string;
    benefits: BenefitsSchemaType,
    description: string,
    isAuthenticated?: boolean,
    isFree: boolean;
    planId: string
}

const PlanCard = ({ price, title, description, benefits, isActivated, isPopular, isAuthenticated, isFree, planId }: Props) => {
    const { mutate, isPending } = useMutation({ mutationFn: purchaseSubscription })
    const router = useRouter()

    const handleSubscription = () => {
        if (!isAuthenticated) {
            router.push("/login")
            return
        }
        // if (isActivated && isAuthenticated) return;
        mutate(planId)
    }


    console.log("isAuthenticated", isAuthenticated)
    return (
        <section className={`${style?.planCard} ${isPopular && style?.popular}`}>
            <h1>{title}</h1>
            <p><strong>$ {price}</strong> /month</p>
            <span>{description}</span>
            {isPopular && <p className={style?.popular}>Popular</p>}

            <ul className={style?.benefits}>
                <li><strong>{benefits?.downloads}</strong> Downloads</li>
                <li><strong>{formatBytes(benefits?.maxSize)}</strong> Storage</li>
            </ul>

            <ul className={style?.description}>
                {benefits?.displayPoints?.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>

            <ButtonGroup
                className={`${style?.button} ${isActivated && isAuthenticated && style?.activated}`}
                submitText={isActivated && isAuthenticated ? "Activated" : isFree && isAuthenticated ? "Active" : "Go Premium"}
                handleSubmit={handleSubscription}
                loading={isPending}
            />
        </section>
    )
}

export default PlanCard