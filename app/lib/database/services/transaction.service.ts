import mongoose, { SessionOption } from "mongoose";
import { PlanSchemaType } from "../interfaces/plan.interface";
import { TRANSACTION_STATUS } from "../interfaces/transaction.interface";
import { TransactionModel } from "../models/transaction";

const Model = TransactionModel

type CreateTransactionType = {
    planDetails: { _id: string } & PlanSchemaType,
    status: TRANSACTION_STATUS;
    userId: string;
    paymentGatewayTransactionId?: string;
}

export class TransactionService {
    getDetails(transactionId: string, options?: SessionOption) {
        return Model.findOne({ _id: new mongoose.Types.ObjectId(transactionId) }, undefined, options)
    }

    lastTransactionByUser(userId: string, options?: SessionOption) {
        return Model.findOne({ userId: new mongoose.Types.ObjectId(userId) }, undefined, options).sort({ createdAt: -1 })
    }

    async create({ planDetails, status, userId, paymentGatewayTransactionId }: CreateTransactionType, options?: SessionOption) {
        const price = planDetails?.price;
        const tax = (price * (18 / 100)) // 18% tax rate;
        const totalPrice = price + tax

        const [transaction] = await TransactionModel.create([{
            planId: planDetails?._id,
            subTotal: planDetails?.price,
            total: totalPrice,
            tax,
            status: status,
            transactionId: paymentGatewayTransactionId,
            userId
        }], options);

        return transaction
    }

    updateStatus(transactionId: string, status: TRANSACTION_STATUS, options?: SessionOption) {
        return TransactionModel.findByIdAndUpdate({
            _id: new mongoose.Types.ObjectId(transactionId),
        }, {
            status: status
        }, options)
    }
}