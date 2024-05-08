import { getFolderInfoByIdApi } from "@/app/_apis_routes/resources";
import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { UserSchemaType } from "@/app/lib/database/interfaces/user.interface";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export type ResourceInfoDataType = {
    isOwner: boolean;
    ownerInfo: Pick<UserSchemaType, "firstName" | "lastName" | "email" | "imageUrl">
    createdAt: string
} & Omit<FilesAndFolderSchemaType, "createdBy">

export const toggleInfo = createAction("showInfo")

export const getFolderInfoAsync = createAsyncThunk<ResourceInfoDataType, { folderId: string }>("getResourceInfo", async (payload, _thunkAPI) => {
    try {
        const data = await getFolderInfoByIdApi(payload.folderId)
        return data?.data
    }
    catch (err) {
        const errors = ErrorHandler(err)
        return Promise.reject(errors)
    }
})