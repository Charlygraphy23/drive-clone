import { FilterQuery } from "mongoose";
import { CreateDataType, DATA_TYPE, FilesAndFolderSchemaType } from "../interfaces/files.interfaces";
import { FilesAndFolderModel } from "../models/filesAndFolders";

const Model = FilesAndFolderModel

export class FilesAndFolderService {

    async findFolderByName(name: string, parentFolderId: string) {
        return await Model.findOne({
            name: name,
            parentFolderId: parentFolderId ?? null
        })
    }
    async createFolder(payload: CreateDataType) {
        return await Model.create({
            name: payload?.name,
            createdBy: payload?.createdBy,
            lastModified: new Date(),
            dataType: payload.type,
            parentFolderId: payload?.parentFolderId ?? null
        })
    }

    async getFolders(folderId?: string) {

        const filter = {
            dataType: DATA_TYPE.FOLDER
        } as FilterQuery<FilesAndFolderSchemaType>;

        if (folderId) {
            filter.parentFolderId = folderId;
        } else {
            filter.$expr = {
                $or: [
                    {
                        $eq: [{ $type: "$parentFolderId" }, "missing"]
                    },
                    {
                        $lte: ["$parentFolderId", null]
                    }
                ]
            }
        }

        return await Model.find(filter)
    }

    async findOne(filters: Partial<Record<keyof (FilesAndFolderSchemaType & { _id: string }), any>>) {
        return await Model.findOne(filters)
    }


    async updateName(_id: string, name: string) {
        return await Model.findOneAndUpdate({ _id }, { name })
    }

}