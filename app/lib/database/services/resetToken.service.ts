
import mongoose, { SessionOption } from "mongoose"
import { ResetTokenSchemaType } from "../interfaces/reset-token.interface"
import { JobModel } from "../models/jobs"

const Model = JobModel


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