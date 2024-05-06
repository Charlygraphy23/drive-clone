import { DATA_TYPE } from "../interfaces/index.interface";
import { FilesAndFolderSchemaType } from "../lib/database/interfaces/files.interfaces";
import { axiosInstance } from "./http";

export type UpdateFolderNamePayload = {
    updatedName: string,
    folderId: string
}

export const addFolderApi = async ({ name, type, parentFolderId }: { type: DATA_TYPE } & Pick<FilesAndFolderSchemaType, "name" | "parentFolderId">) => {
    const data = await axiosInstance.post("/resources/folders", {
        name, type, parentFolderId
    })

    return data?.data as {
        folderId: string,
    }

}

export const updateFolderNameApi = async (payload: UpdateFolderNamePayload) => {
    return await axiosInstance.patch('/resources/folders', payload)
}


export const getFolderInfoByIdApi = async (folderId: string) => {
    return await axiosInstance.get(`/resources/folders/${folderId}`)
}
