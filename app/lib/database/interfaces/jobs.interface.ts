/* eslint-disable no-unused-vars */
import { Document, ObjectId } from "mongoose";

export enum JobOperationType {
    DELETE_S3 = "delete_s3"
}

export enum JobStatusType {
    NEW = "new",
    INPROGRESS = "in-progress",
    FINISHED = "finished"
}

export interface JobSchemaType {
    data: string | null | Record<string, unknown>;
    createdBy: string | ObjectId;
    operation: JobOperationType;
    status: JobStatusType;
}

export interface JobDocumentType extends JobSchemaType, Document { }