import axios from "axios";
import { CreateDataType } from "../lib/database/interfaces/files.interfaces";

export type UpdateFolderNamePayload = {
    updatedName: string,
    folderId: string
}

export const addFolderApi = async ({ name, createdBy, type, parentFolderId }: CreateDataType) => {

    const data = await axios.post("/api/data/create", {
        name, createdBy, type, parentFolderId
    }, {
        timeout: 30 * 1000
    })

    return data?.data as {
        _id: string,
    }

}

export const updateFolderNameApi = async (payload: UpdateFolderNamePayload) => {
    return await axios.patch('/api/data/folders', payload, {
        timeout: 30 * 1000
    })
}

