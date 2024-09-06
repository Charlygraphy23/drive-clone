import { Document, ObjectId } from "mongoose";


export interface ResetTokenSchemaType {
    userId?: ObjectId | string | null;
    hash: string;
    expiry: string | Date;
    isActive?: boolean;

}

export interface ResetTokenDocumentType extends ResetTokenSchemaType, Document { }

