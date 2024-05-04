import { DATA_TYPE } from "../interfaces/index.interface";
import { FilesAndFolderSchemaType } from "../lib/database/interfaces/files.interfaces";
import { axiosInstance } from "./http";

export type UpdateFolderNamePayload = {
    updatedName: string,
    folderId: string
}

export const addFolderApi = async ({ name, createdBy, type, parentFolderId }: { type: DATA_TYPE } & Pick<FilesAndFolderSchemaType, "name" | "createdBy" | "parentFolderId">) => {
    const data = await axiosInstance.post("/data/folders", {
        name, createdBy, type, parentFolderId
    })

    return data?.data as {
        folderId: string,
    }

}

export const updateFolderNameApi = async (payload: UpdateFolderNamePayload) => {
    return await axiosInstance.patch('/data/folders', payload)
}

