/* eslint-disable no-unused-vars */

import { ObjectId } from "mongoose";
import { BenefitsSchemaType } from "./benefits.interface";


export enum PLAN_TYPE {
    RECURRING = "RECURRING",
    ONETIME = "ONETIME",
}

export enum RECURRING_TYPE {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    NONE = "NONE",
}

export interface PlanSchemaType {
    title: string;
    price: number;
    description: string;
    isPopular: boolean;
    planType: PLAN_TYPE;
    recurringType: RECURRING_TYPE
    isFree: boolean;
    benefitId: string | ObjectId
}

export interface PlanDocumentType extends PlanSchemaType, Document { }


export type GetPlanWithBenefitType = {
    _id: string,
    benefits: {
        _id: string
    } & BenefitsSchemaType
} & PlanSchemaType