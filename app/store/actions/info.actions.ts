import { getFolderInfoByIdApi } from "@/app/_apis_routes/resources";
import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { UserSchemaType } from "@/app/lib/database/interfaces/user.interface";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

export type ResourceInfoDataType = {
    isOwner: boolean;
    ownerInfo: Pick<UserSchemaType, "firstName" | "lastName" | "email" | "imageUrl">
    createdAt: string
    _id: string
} & Omit<FilesAndFolderSchemaType, "createdBy">

export const toggleInfo = createAction("showInfo")
export const clearSelectedFolderId = createAction("clearSelectedFolderId")


export const getFolderInfoAsync = createAsyncThunk<ResourceInfoDataType, { folderId: string }>("getResourceInfo", async (payload, _thunkAPI) => {
    try {

        const ID = payload.folderId;
        const state = _thunkAPI.getState() as RootState
        const info = state?.resourceInfo?.data[ID];

        if (info) return info

        const data = await getFolderInfoByIdApi(ID)
        return data?.data?.data
    }
    catch (err) {
        const errors = ErrorHandler(err)
        return Promise.reject(errors)
    }
})