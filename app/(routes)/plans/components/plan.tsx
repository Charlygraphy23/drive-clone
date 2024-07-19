"use client"

import ButtonGroup from '@/app/components/buttonGroup';
import style from '../style.module.scss';

type Props = {
    isPopular?: boolean;
    isActivated?: boolean;
    price: number;
    title: string;
    benefits: string[],
    description: string,
    isAuthenticated?: boolean
}

const PlanCard = ({ price, title, description, benefits, isActivated, isPopular, isAuthenticated }: Props) => {
    console.log("isAuthenticated", isAuthenticated)
    return (
        <section className={`${style?.planCard} ${isPopular && style?.popular}`}>
            <h1>{title}</h1>
            <p><strong>$ {price}</strong> /month</p>
            <span>{description}</span>
            {isPopular && <p className={style?.popular}>Popular</p>}

            <ul>
                {benefits?.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>

            <ButtonGroup className={`${style?.button} ${isActivated && isAuthenticated && style?.activated}`} submitText={isActivated && isAuthenticated ? "Activated" : "Go Premium"} />
        </section>
    )
}

export default PlanCard