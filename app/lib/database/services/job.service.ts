
import { SessionOption } from "mongoose"
import { User } from "next-auth"
import { JobOperationType } from "../interfaces/jobs.interface"
import { JobModel } from "../models/jobs"

const Model = JobModel


export class JobService {

    async createJob(data: string, type: JobOperationType, user: User, options?: SessionOption) {
        await Model.create([{
            data,
            operation: type,
            createdBy: user?._id
        }], options)
    }

}