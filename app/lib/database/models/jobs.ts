import mongoose, { Model, Types } from "mongoose";
import { JobDocumentType, JobOperationType, JobSchemaType, JobStatusType } from "../interfaces/jobs.interface";
import { MODEL_NAME as USER_MODEL } from "./user";

export const MODEL_NAME = "Jobs" as const;

const schema = new mongoose.Schema<JobSchemaType>({
    createdBy: {
        type: Types.ObjectId,
        ref: USER_MODEL,
        index: true,
        default: null
    },
    operation: {
        type: String,
        enum: JobOperationType,
        index: true,
        default: JobOperationType.DELETE_S3
    },
    status: {
        type: String,
        enum: JobStatusType,
        index: true,
        default: JobStatusType.NEW
    },

    data: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

}, { timestamps: true })

export const JobModel = mongoose.models.Jobs as Model<JobDocumentType> || mongoose.model<JobDocumentType>(MODEL_NAME, schema)