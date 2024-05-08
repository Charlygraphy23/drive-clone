import mongoose, { Model, Types } from "mongoose";
import { ACCESS_ORIGIN, ACCESS_TYPE, AccessDocumentType, AccessSchemaType } from "../interfaces/access.interface";
import { MODEL_NAME as DATA_MODEL } from "./filesAndFolders";
import { MODEL_NAME as USER_MODEL } from "./user";

export const MODEL_NAME = "Access" as const;

const schema = new mongoose.Schema<AccessSchemaType>({
    rootId: {
        type: Types.ObjectId,
        ref: MODEL_NAME,
        index: true,
        default: null
    },
    createdFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL,
        index: true
    },
    accessType: {
        type: String,
        enum: ACCESS_TYPE,
        index: true,
        default: ACCESS_TYPE.READ
    },
    origin: {
        type: String,
        enum: ACCESS_ORIGIN,
        index: true,
        default: ACCESS_ORIGIN.SELF
    },

    resourceId: {
        type: Types.ObjectId,
        ref: DATA_MODEL,
        index: true,
    },

}, { timestamps: true })

schema.index({ createFor: 1, resourceId: 1 }, { unique: true })

export const AccessModal = mongoose.models.Access as Model<AccessDocumentType> || mongoose.model<AccessDocumentType>(MODEL_NAME, schema)