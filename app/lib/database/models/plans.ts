import mongoose, { Model } from "mongoose";
import { PLAN_TYPE, PlanSchemaType, RECURRING_TYPE } from "../interfaces/plan.interface";
import { MODEL_NAME as BENEFIT_MODEL_NAME } from "./benefits";

export const MODEL_NAME = "Plan" as const;

const schema = new mongoose.Schema<PlanSchemaType>({
    title: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    isPopular: {
        type: Boolean,
    },
    planType: {
        type: String,
        enum: PLAN_TYPE,
        default: PLAN_TYPE.ONETIME
    },
    recurringType: {
        type: String,
        enum: RECURRING_TYPE,
        default: RECURRING_TYPE.NONE
    },
    isFree: {
        type: Boolean,
        default: false
    },
    benefitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: BENEFIT_MODEL_NAME
    }
}, { timestamps: true })

export const PlanModel = mongoose.models.Plan as Model<PlanSchemaType> || mongoose.model<PlanSchemaType>(MODEL_NAME, schema)
