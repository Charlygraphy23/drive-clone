/* eslint-disable no-unused-vars */
import { Document, ObjectId } from "mongoose";

export enum TRANSACTION_STATUS {
    PENDING = "pending",
    DONE = "done",
    FAILED = "failed"
}


export interface TransactionSchemaType {
    planId: string | ObjectId;
    transactionId?: string;
    total: number;
    subTotal: number;
    tax: number;
    status: TRANSACTION_STATUS;
    userId: string | ObjectId;
}

export interface TransactionDocumentType extends TransactionSchemaType, Document { }