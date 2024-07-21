/* eslint-disable no-unused-vars */
import { Document, ObjectId } from "mongoose";

export enum ORDER_TYPE {
    PENDING = "pending",
    DONE = "done",
    FAILED = "failed"
}


export interface OrderSchemaType {
    planId: string | ObjectId;
    transactionId?: string;
    total: number;
    subTotal: number;
    tax: number;
    orderType: ORDER_TYPE
}

export interface OrderDocumentType extends OrderSchemaType, Document { }