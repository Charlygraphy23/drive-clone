import { CreateDataType, FilesAndFolderSchemaType } from "../interfaces/files.interfaces";
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

    async getFolders() {
        return await Model.find({})
    }

    async findOne(filters: Partial<Record<keyof (FilesAndFolderSchemaType & { _id: string }), any>>) {
        return await Model.findOne(filters)
    }


    async updateName(_id: string, name: string) {
        return await Model.findOneAndUpdate({ _id }, { name })
    }

}