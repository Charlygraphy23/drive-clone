import mongoose, { Model } from "mongoose";
import { StorageDocumentType, StorageSchemaType } from "../interfaces/storage.interface";
import { MODEL_NAME as USER_MODEL_NAME } from "./user";


export const MODEL_NAME = "Storage" as const;

const schema = new mongoose.Schema<StorageSchemaType>({
    totalStorageInBytes: {
        type: Number,
        index: true,
    },
    lastOrderId: {
        type: String,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL_NAME,
        index: true,
        unique: true,
    }

}, { timestamps: true })

export const StorageModal = mongoose.models.Storage as Model<StorageDocumentType> || mongoose.model<StorageDocumentType>(MODEL_NAME, schema)