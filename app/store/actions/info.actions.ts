import { getFolderInfoByIdApi } from "@/app/_apis_routes/resources";
import { AccessSchemaType } from "@/app/lib/database/interfaces/access.interface";
import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { UserSchemaType } from "@/app/lib/database/interfaces/user.interface";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

type UserInfoType = { _id: string } & Pick<UserSchemaType, "firstName" | "lastName" | "email" | "imageUrl">

export type ResourceInfoDataType = {
    isOwner: boolean;
    ownerInfo: UserInfoType
    createdAt: string
    _id: string
    accessList?: Array<{ _id: string, userInfo: UserInfoType, rootId?: string, resourceId: string } & Omit<AccessSchemaType, "createdFor" | "rootId" | "resourceId">>
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