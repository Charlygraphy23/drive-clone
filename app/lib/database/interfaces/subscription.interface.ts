/* eslint-disable no-unused-vars */

import { ObjectId } from "mongoose";
import { PLAN_TYPE, RECURRING_TYPE } from "./plan.interface";

export interface ActiveNewSubscriptionType {
    userId: string;
    planId: string;
    orderId: string;
}

export interface SubscriptionSchemaType {
    isActive: boolean;
    userId: string | ObjectId;
    startDate: string | Date;
    endDate?: string | Date;
    planId: string | ObjectId;
    orderId: string | ObjectId;
    planDetails: {
        planType: PLAN_TYPE,
        recurringType: RECURRING_TYPE,
        isFree: boolean,
        price: number,
        benefitId: string | ObjectId,
        benefitDetails: {
            maxSize: number,
            downloads: number
        }
    }
}

export interface SubscriptionDocumentType extends SubscriptionSchemaType, Document { }