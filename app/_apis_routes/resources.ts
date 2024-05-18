import { DATA_TYPE } from "../interfaces/index.interface";
import { ACCESS_TYPE } from "../lib/database/interfaces/access.interface";
import { FilesAndFolderSchemaType } from "../lib/database/interfaces/files.interfaces";
import { axiosInstance } from "./http";

export type UpdateFolderNamePayload = {
    updatedName: string,
    id: string,
}

export type UpdateAccessTypePayload = {
    accessList: {
        accessId?: string;
        accessType: ACCESS_TYPE,
        createdFor: string
    }[],
    resourceId: string,
    deletedUserIds: string[],

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


export const getFolderInfoByIdApi = async (resourceId: string) => {
    return await axiosInstance.get(`/resources/${resourceId}`)
}


export const updateAccess = async (payload: UpdateAccessTypePayload) => {
    return await axiosInstance.patch(`/resources/access`, payload)
}

export const moveToTrashResourceApi = async (resourceId: string) => {
    return await axiosInstance.patch(`/resources/${resourceId}`)
}