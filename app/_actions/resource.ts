"use server"

import { unstable_cache } from "next/cache";
import { getResources } from "../api/resources/_fetch";
import { ResourceDatasetType } from "../components/body/components/resources/interfaces/index.interface";
import { DATA_TYPE } from "../lib/database/interfaces/files.interfaces";



export const fetchFolderData = unstable_cache(async (folderId?: string) => {
    "use server"
    const dataset = await getResources(folderId, DATA_TYPE.FOLDER, false, "show");
    const response = JSON.parse(JSON.stringify(dataset?.data))
    return response?.resources as ResourceDatasetType["folders"]
}, ["folders"], {
    tags: ["folders"]
})

export const fetchFileData = unstable_cache(async (folderId?: string) => {
    "use server"
    const dataset = await getResources(folderId, DATA_TYPE.FILE, false, "show", 1, 10);
    const response = JSON.parse(JSON.stringify(dataset?.data))
    return response
}, ["files"], {
    tags: ["files"]
})