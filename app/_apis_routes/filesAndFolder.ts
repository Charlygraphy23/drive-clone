import axios from "axios";
import { CreateDataType } from "../lib/database/interfaces/files.interfaces";

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