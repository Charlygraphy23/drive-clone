import mongoose, { Model, Types } from "mongoose";
import { ORDER_STATUS, OrderDocumentType, OrderSchemaType } from "../interfaces/order.interface";
import { MODEL_NAME as PLAN_MODEL } from "./plans";

export const MODEL_NAME = "Order" as const;

const schema = new mongoose.Schema<OrderSchemaType>({
    planId: {
        type: Types.ObjectId,
        ref: PLAN_MODEL,
        index: true,
    },
    transactionId: {
        type: String,
        unique: true,
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
    orderStatus: {
        type: String,
        enum: ORDER_STATUS,
        default: ORDER_STATUS.PENDING
    }
}, { timestamps: true })

export const OrderModel = mongoose.models.Order as Model<OrderDocumentType> || mongoose.model<OrderDocumentType>(MODEL_NAME, schema)