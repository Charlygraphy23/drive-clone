import { ObjectId } from "mongoose";

export interface StorageSchemaType {
    totalStorageInBytes: number;
    lastOrderId: string;
    userId: string | ObjectId
}

export interface StorageDocumentType extends StorageSchemaType, Document { }