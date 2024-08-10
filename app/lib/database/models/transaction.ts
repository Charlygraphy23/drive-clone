import mongoose, { Model, Types } from "mongoose";
import { TRANSACTION_STATUS, TransactionDocumentType, TransactionSchemaType } from "../interfaces/transaction.interface";
import { MODEL_NAME as PLAN_MODEL } from "./plans";
import { MODEL_NAME as USER_MODEL } from "./user";


export const MODEL_NAME = "Transaction" as const;

const schema = new mongoose.Schema<TransactionSchemaType>({
    planId: {
        type: Types.ObjectId,
        ref: PLAN_MODEL,
        index: true,
    },
    transactionId: {
        type: String,
        // unique: true,
        index: true
    },
    total: {
        type: Number,
        default: 0
    },
    subTotal: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: TRANSACTION_STATUS,
        default: TRANSACTION_STATUS.PENDING
    },
    userId: {
        type: Types.ObjectId,
        ref: USER_MODEL,
        index: true,
    }
}, { timestamps: true })

export const TransactionModel = mongoose.models.Transaction as Model<TransactionDocumentType> || mongoose.model<TransactionDocumentType>(MODEL_NAME, schema)