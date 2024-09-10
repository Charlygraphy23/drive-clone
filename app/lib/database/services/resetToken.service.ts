
import mongoose, { SessionOption } from "mongoose"
import { ResetTokenSchemaType } from "../interfaces/reset-token.interface"
import { ResetToken } from "../models/reset-token"

const Model = ResetToken

export class ResetTokenService {

    async getByUserId(userId: string, options?: SessionOption) {
        return await Model.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        }, undefined, options)
    }

    async update(filter: Partial<ResetTokenSchemaType>, update: Partial<ResetTokenSchemaType>, options?: SessionOption) {
        return await Model.findOneAndUpdate(filter, update, options)
    }

}