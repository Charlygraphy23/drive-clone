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


export const getFoldersApi = async () => {
    const res = await fetch('http://localhost:3000/api/data/folders')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    console.log(await res.json())
    return await res.json()

}

