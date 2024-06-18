"use server"

import { unstable_cache } from "next/cache";
import { RedirectType, redirect } from "next/navigation";
import { getResources } from "../api/resources/_fetch";
import { ResourceDatasetType } from "../components/body/components/resources/interfaces/index.interface";
import { DATA_TYPE } from "../lib/database/interfaces/files.interfaces";
import { FetchAllResourceResponseType } from "../store/actions";



export const fetchFolderData = unstable_cache(async (folderId?: string, _userId?: string, isShared?: boolean, search?: string) => {
    "use server"

    console.log('Search ', search)

    const shared = isShared ? "only" : "off"
    const dataset = await getResources({
        folderId, resourceType: DATA_TYPE.FOLDER, showDeleted: false, shared, search
    });

    if (dataset?.status === 200) {
        const response = JSON.parse(JSON.stringify(dataset?.data))
        return response?.resources as ResourceDatasetType["folders"]
    }
    return redirect("/", RedirectType.replace)
}, ["folders"], {
    tags: ["folders",]
})

export const fetchFileData = unstable_cache(async (folderId?: string, _userId?: string, isShared?: boolean, search?: string) => {
    "use server"

    const shared = isShared ? "only" : "off"
    const dataset = await getResources({
        folderId, resourceType: DATA_TYPE.FILE, showDeleted: false, shared, page: 1, limit: 10, search
    });

    if (dataset?.status === 200) {
        const response = JSON.parse(JSON.stringify(dataset?.data))
        return response as {
            resources: ResourceDatasetType["files"],
            next: boolean
        }
    }

    return redirect("/", RedirectType.replace)

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
}, _userId?: string) => {
    "use server"
    const dataset = await getResources({
        showDeleted, shared, page, limit
    });

    if (dataset?.status === 200) {
        const response = JSON.parse(JSON.stringify(dataset?.data)) as FetchAllResourceResponseType;
        return response
    }

    return redirect("/", RedirectType.replace)
}, ["resources"], {
    tags: ["resources"]
})