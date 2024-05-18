import mongoose, { Document } from "mongoose";

/* eslint-disable no-unused-vars */
export enum DATA_TYPE {
    FILE = "file",
    FOLDER = "folder",
}

export interface FilesAndFolderSchemaType {
    name: string;
    createdBy: string | mongoose.Types.ObjectId;
    lastModified?: string | Date;
    dataType: DATA_TYPE;
    parentFolderId?: string | mongoose.Types.ObjectId,
    isDeleted?: boolean
}

export interface FilesAndFolderDocument extends FilesAndFolderSchemaType, Document { }


export interface CreateDataType {
    name: string;
    createdBy: string;
    type: DATA_TYPE;
    parentFolderId?: string | null
}