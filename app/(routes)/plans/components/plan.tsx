"use client"

import { purchaseSubscription } from '@/app/_apis_routes/purchase';
import ButtonGroup from '@/app/components/buttonGroup';
import { BenefitsSchemaType } from '@/app/lib/database/interfaces/benefits.interface';
import { useAppDispatch } from '@/app/store';
import { activatePlan } from '@/app/store/actions/plan.actions';
import { formatBytes } from '@/app/utils/index.utils';
import { RazorpayClient } from '@/app/utils/razorpay/client';
import { useMutation } from '@tanstack/react-query';
import { User } from 'next-auth';
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
    user?: User
}

const PlanCard = ({ price, title, description, benefits, isActivated, isPopular, isAuthenticated, isFree, planId, user }: Props) => {
    const { mutateAsync, isPending } = useMutation({ mutationFn: purchaseSubscription })
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleSubscription = async () => {

        if (isActivated) return;
        if (!isAuthenticated) {
            router.push("/login")
            return
        }

        const { data } = await mutateAsync(planId);

        if (isFree) {
            dispatch(activatePlan(planId))
            return;
        }

        const response = data?.data;

        if (!response) throw new Error("Something went wrong!")

        const options = {
            "amount": String(response?.amount),
            "currency": "INR",
            "name": `${user?.firstName} ${user?.lastName}`,
            "description": "",
            "image": "",
            "order_id": response?.razorpayOrderId,
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": {
                "name": `${user?.firstName} ${user?.lastName}`,
                "email": `${user?.email}`,
                "contact": ""
            },
            "notes": {
                ...response
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const razorpayClient = new RazorpayClient(options).instance;
        razorpayClient.open()
    }


    return (
        <section className={`${style?.planCard} ${isPopular && style?.popular}`}>
            <h1>{title}</h1>
            <p><strong>&#8377; {price}</strong> /month</p>
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
                submitText={isActivated && isAuthenticated ? "Activated" : isFree && isAuthenticated ? "Active" : isFree ? "Join" : "Go Premium"}
                handleSubmit={handleSubscription}
                loading={isPending}
            />
        </section>
    )
}

export default PlanCard