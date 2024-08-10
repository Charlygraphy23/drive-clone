import mongoose, { Model } from "mongoose";
import { PLAN_TYPE, RECURRING_TYPE } from "../interfaces/plan.interface";
import { SubscriptionDocumentType, SubscriptionSchemaType } from "../interfaces/subscription.interface";
import { MODEL_NAME as BENEFIT_MODEL_NAME } from "./benefits";
import { MODEL_NAME as PLAN_MODEL_NAME } from "./plans";
import { MODEL_NAME as TRANSACTION_MODEL_NAME } from "./transaction";
import { MODEL_NAME as USER_MODEL_NAME } from "./user";


export const MODEL_NAME = "User_Subscription" as const;

const schema = new mongoose.Schema<SubscriptionSchemaType>({
    isActive: {
        type: Boolean,
        index: true,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL_NAME,
        index: true,
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: PLAN_MODEL_NAME,
    },
    planDetails: {
        planType: {
            type: String,
            enum: PLAN_TYPE
        },
        recurringType: {
            type: String,
            enum: RECURRING_TYPE,
        },
        isFree: {
            type: Boolean,
        },
        price: {
            type: Number
        },
        benefitId: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            ref: BENEFIT_MODEL_NAME
        },
        benefitDetails: {
            maxSize: {
                type: Number,
            },
            downloads: {
                type: Number,
            },
        }
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: TRANSACTION_MODEL_NAME
    }


}, { timestamps: true })

export const SubscriptionModel = mongoose.models.User_Subscription as Model<SubscriptionDocumentType> || mongoose.model<SubscriptionDocumentType>(MODEL_NAME, schema)