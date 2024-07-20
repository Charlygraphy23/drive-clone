"use client"

import ButtonGroup from '@/app/components/buttonGroup';
import { BenefitsSchemaType } from '@/app/lib/database/interfaces/benefits.interface';
import { formatBytes } from '@/app/utils/index.utils';
import style from '../style.module.scss';

type Props = {
    isPopular?: boolean;
    isActivated?: boolean;
    price: number;
    title: string;
    benefits: BenefitsSchemaType,
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

            <ul className={style?.benefits}>
                <li><strong>{benefits?.downloads}</strong> Downloads</li>
                <li><strong>{formatBytes(benefits?.maxSize)}</strong> Storage</li>
            </ul>

            <ul className={style?.description}>
                {benefits?.displayPoints?.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>

            <ButtonGroup className={`${style?.button} ${isActivated && isAuthenticated && style?.activated}`} submitText={isActivated && isAuthenticated ? "Activated" : "Go Premium"} />
        </section>
    )
}

export default PlanCard