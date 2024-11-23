import { getResourceInfoByIdApi } from "@/app/_apis_routes/resources";
import { ACCESS_TYPE, AccessSchemaType } from "@/app/lib/database/interfaces/access.interface";
import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "next-auth";
import { RootState } from "..";

type UserInfoType = { _id: string } & Pick<User, "firstName" | "lastName" | "email" | "imageUrl">
export type AccessList = { _id: string, userInfo: UserInfoType, rootId?: string, resourceId: string } & Omit<AccessSchemaType, "createdFor" | "rootId" | "resourceId">

export type ResourceInfoDataType = {
    isOwner: boolean;
    ownerInfo: UserInfoType
    createdAt: string
    _id: string
    accessList?: AccessList[]
} & Omit<FilesAndFolderSchemaType, "createdBy">

export type UpdateInfoByFolderIdType = {
    accesses: {
        accessId?: string;
        accessType: ACCESS_TYPE,
        createdFor: string,
        userInfo: UserInfoType
    }[],
    resourceId: string,
}

export type UpdateInfoActionType = {
    id: string,
    data: Partial<ResourceInfoDataType>
}

export const toggleInfo = createAction<boolean | undefined>("showInfo")
export const clearSelectedFolderId = createAction("clearSelectedFolderId")
export const invalidateCacheById = createAction<string>("invalidateCacheById")
export const updateInfoByFolderId = createAction<UpdateInfoByFolderIdType>("updateInfoByFolderId")
export const invalidateCache = createAction("invalidateCache")
export const updateInfo = createAction<UpdateInfoActionType>("updateInfo")



export const getResourceInfoAsync = createAsyncThunk<ResourceInfoDataType, { resourceId: string, withDeleted?: boolean }>("getResourceInfo", async (payload, _thunkAPI) => {
    try {

        const ID = payload.resourceId;
        const state = _thunkAPI.getState() as RootState
        const info = state?.resourceInfo?.data[ID];

        if (info) return info

        const response = await getResourceInfoByIdApi(ID, payload?.withDeleted)
        return response?.data?.data
    }
    catch (err) {
        const errors = ErrorHandler(err)
        return Promise.reject(errors)
    }
})