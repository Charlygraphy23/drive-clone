import mongoose, { SessionOption } from "mongoose"
import { OrderModel } from "../models/order"

const Model = OrderModel

export class OrderService {
    getOrderDetails(orderId: string, options?: SessionOption) {
        return Model.findOne({ _id: new mongoose.Types.ObjectId(orderId) }, {}, options)
    }
}