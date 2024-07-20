import mongoose, { Model } from "mongoose";
import { BenefitsSchemaType } from "../interfaces/benefits.interface";


export const MODEL_NAME = "Benefit" as const;

const schema = new mongoose.Schema<BenefitsSchemaType>({
    title: {
        type: String,
        default: ""
    },
    maxSize: {
        type: Number,
    },
    downloads: {
        type: Number,
        default: 0
    },
    displayPoints: {
        type: [String]
    }
}, { timestamps: true })

export const BenefitsModal = mongoose.models.Benefit as Model<BenefitsSchemaType> || mongoose.model<BenefitsSchemaType>(MODEL_NAME, schema)
