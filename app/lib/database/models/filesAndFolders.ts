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
    key: {
        type: String,
        select: false
    },
    fileSize: {
        type: Number,
    },
    mimeType: {
        type: String,
    },

}, { timestamps: true })


schema.pre('find', function () {

    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('findOneAndDelete', function () {
    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('findOneAndUpdate', function () {
    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('updateMany', function () {
    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('updateOne', function () {
    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('findOneAndReplace', function () {
    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('findOne', function () {
    const options = this.getOptions()

    if (!options?.withDeleted) {
        this.where({ isDeleted: { $ne: true } });
    }
});
schema.pre('aggregate', function () {
    const options = this.options

    if (!options?.withDeleted) {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    }
});

export const FilesAndFolderModel = mongoose.models["Files_And_Folders"] as Model<FilesAndFolderDocument> || mongoose.model<FilesAndFolderDocument>(MODEL_NAME, schema)