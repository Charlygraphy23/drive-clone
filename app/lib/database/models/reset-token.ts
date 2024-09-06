import mongoose, { Model, Types } from "mongoose";
import { ResetTokenDocumentType, ResetTokenSchemaType } from "../interfaces/reset-token.interface";
import { MODEL_NAME as USER_MODEL } from "./user";

export const MODEL_NAME = "ResetToken" as const;

const schema = new mongoose.Schema<ResetTokenSchemaType>({
    userId: {
        type: Types.ObjectId,
        ref: USER_MODEL,
        index: true,
    },
    hash: {
        type: String,
    },
    expiry: {
        type: Date,
        default: new Date(),
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    }
}, { timestamps: true })

schema.index({ expiry: 1 }, { expireAfterSeconds: 60 * 3 })

export const ResetToken = mongoose.models.ResetToken as Model<ResetTokenDocumentType> || mongoose.model<ResetTokenDocumentType>(MODEL_NAME, schema)