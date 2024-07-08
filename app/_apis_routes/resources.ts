import { GenericAbortSignal } from "axios";
import { ACCESS_TYPE } from "../lib/database/interfaces/access.interface";
import { DATA_TYPE, FilesAndFolderSchemaType } from "../lib/database/interfaces/files.interfaces";
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


export const updateFileNameApi = async (payload: UpdateFolderNamePayload) => {
    return await axiosInstance.patch('/resources/files', payload)
}


export const getResourceInfoByIdApi = async (resourceId: string, withDeleted?: boolean) => {
    let path = `/resources/${resourceId}`

    if (withDeleted) {
        path = path + `?deleted=true`
    }

    return await axiosInstance.get(path)
}


export const updateAccess = async (payload: UpdateAccessTypePayload) => {
    return await axiosInstance.patch(`/resources/access`, payload)
}

export const moveToTrashResourceApi = async (resourceId: string) => {
    return await axiosInstance.patch(`/resources/${resourceId}`)
}

export const restoreFromTrashApi = async (resourceId: string) => {
    return await axiosInstance.post(`/resources/${resourceId}`, {})
}

export const deleteForeverApi = async (resourceId: string) => {
    return await axiosInstance.delete(`/resources/${resourceId}`)
}

export const uploadFile = async ({ formData, signal }: { formData: FormData, signal: GenericAbortSignal }) => {
    const { data } = await axiosInstance.post(`/resources/files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        signal
    })


    return { uploadId: data?.uploadId, file: data?.data }
}

export const getResourcesApi = async ({ page, limit, folderId }: { page: number, limit: number, folderId?: string }) => {

    const queryParams = new URLSearchParams();
    if (folderId) {
        queryParams.set("folderId", folderId)
    }

    if (page) {
        queryParams.set("page", String(page))
    }

    if (limit) {
        queryParams.set("limit", String(limit))
    }


    const query = queryParams?.toString()
    const { data } = await axiosInstance.get(`/resources?${query}`)
    return data
}

export const removeAccessFromResourceApi = async (payload: { accessId: string, resourceId: string }) => {
    return axiosInstance.put(`/resources/access`, payload)
}

export const fileDownloadApi = async (url: string) => {
    return axiosInstance.get(url, {
        responseType: "blob"
    })
}

export const abortFileUploadApi = (uploadId: string, fileName: string) => {
    return axiosInstance.post("/resources/files/abort", {
        s3UploadId: uploadId, fileName
    })
}