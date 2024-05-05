import { Document, ObjectId } from "mongoose";

/* eslint-disable no-unused-vars */
export enum ACCESS_TYPE {
    WRITE = 'write',
    READ = "read"
}

export enum ACCESS_ORIGIN {
    PARENT = 'parent',
    SELF = "self"
}

export interface AccessSchemaType {
    rootId?: ObjectId | string | null;
    accessType: ACCESS_TYPE;
    origin: ACCESS_ORIGIN;
    createdFor: ObjectId | string;
    resourceId: ObjectId | string;
}

export interface AccessDocumentType extends AccessSchemaType, Document { }

export type CreateWithParentType = {
    userId: string;
    parentFolderId: ObjectId | string | null
    resourceId: ObjectId | string
}