import mongoose, { Model } from "mongoose";
import { DATA_TYPE, FilesAndFolderDocument, FilesAndFolderSchemaType } from '../interfaces/files.interfaces';
import { MODEL_NAME as USER_MODEL } from "./user";

export const MODEL_NAME = "Files_And_Folders" as const;

const schema = new mongoose.Schema<FilesAndFolderSchemaType>({
    name: {
        type: String,
        trim: true,
        index: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_MODEL,
        index: true
    },
    lastModified: {
        type: Date,
    },
    dataType: {
        type: String,
        enum: DATA_TYPE,
        index: true
    },
    parentFolderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODEL_NAME,
        index: true,
        default: null // means root
    },
    isDeleted: {
        type: Boolean,
        index: true,
        default: false
    },
}, { timestamps: true })


schema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('findOneAndDelete', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('findOneAndUpdate', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('updateMany', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('updateOne', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('findOneAndReplace', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('findOne', function () {
    this.where({ isDeleted: { $ne: true } });
});
schema.pre('aggregate', function () {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const FilesAndFolderModel = mongoose.models["Files_And_Folders"] as Model<FilesAndFolderDocument> || mongoose.model<FilesAndFolderDocument>(MODEL_NAME, schema)