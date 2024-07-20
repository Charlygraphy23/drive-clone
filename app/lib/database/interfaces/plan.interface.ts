/* eslint-disable no-unused-vars */

import { ObjectId } from "mongoose";


export enum PLAN_TYPE {
    RECURRING = "RECURRING",
    ONETIME = "ONETIME",
}

export enum RECURRING_TYPE {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    NONE = "NONE",
}

export interface PlaneSchemaType {
    title: string;
    price: number;
    description: string;
    isPopular: boolean;
    planType: PLAN_TYPE;
    recurringType: RECURRING_TYPE
    isFree: boolean;
    benefitId: string | ObjectId
}

export interface PlanDocumentType extends PlaneSchemaType, Document { }