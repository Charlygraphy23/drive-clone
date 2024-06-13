"use server"

import { unstable_cache } from "next/cache";
import { getResources } from "../api/resources/_fetch";
import { ResourceDatasetType } from "../components/body/components/resources/interfaces/index.interface";
import { DATA_TYPE } from "../lib/database/interfaces/files.interfaces";
import { FetchAllResourceResponseType } from "../store/actions";



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


export const fetchAllResource = unstable_cache(async ({
    page = 1,
    limit = 10,
    showDeleted = false,
    shared = "off"
}: {
    page: number;
    limit: number;
    showDeleted?: boolean;
    shared?: "only" | "show" | "off"
}) => {
    "use server"
    const dataset = await getResources("", null, showDeleted, shared, page, limit);
    const response = JSON.parse(JSON.stringify(dataset?.data)) as FetchAllResourceResponseType;
    console.log("response", response)
    return response
}, ["resources"], {
    tags: ["resources"]
})