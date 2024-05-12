import { DATA_TYPE } from "../interfaces/index.interface";
import { ACCESS_TYPE } from "../lib/database/interfaces/access.interface";
import { FilesAndFolderSchemaType } from "../lib/database/interfaces/files.interfaces";
import { axiosInstance } from "./http";

export type UpdateFolderNamePayload = {
    updatedName: string,
    folderId: string
}

export type UpdateAccessTypePayload = {
    accessList: {
        accessId?: string;
        accessType: ACCESS_TYPE,
        createdFor: string
    }[],
    resourceId: string
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


export const updateAccess = async (payload: UpdateAccessTypePayload) => {
    return await axiosInstance.patch(`/resources/access`, payload)
}