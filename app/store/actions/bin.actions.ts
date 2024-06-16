import { fetchAllResource } from "@/app/_actions/resource";
import { deleteForeverApi, restoreFromTrashApi } from "@/app/_apis_routes/resources";
import { ResourceDatasetType } from "@/app/components/body/components/resources/interfaces/index.interface";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "next-auth";

export type FetchAllResourceType = {
    page: number;
    limit: number;
    showDeleted?: boolean;
    shared?: "only" | "show" | "off";
    user?: Session["user"]
}

export type FetchAllResourceResponseType = {
    page?: number;
    limit?: number;
    total?: number;
    resources: ResourceDatasetType["files"];
    next?: boolean;

}

export const addBulkResourcesAsync = createAsyncThunk<FetchAllResourceResponseType, FetchAllResourceType>("addBulkResources", async (payload, _thunkAPI) => {
    try {
        const { user, ...rest } = payload
        const data = await fetchAllResource(rest, String(user?._id ?? ""))
        return data as FetchAllResourceResponseType
    }
    catch (err) {
        const errors = ErrorHandler(err)
        _thunkAPI.rejectWithValue(errors)
        return Promise.reject(errors)
    }
})

export const appendBulkResources = createAsyncThunk<FetchAllResourceResponseType, FetchAllResourceType>("appendBulkResources", async (payload, _thunkAPI) => {
    try {
        const { user, ...rest } = payload
        const data = await fetchAllResource(rest, String(user?._id ?? ""))
        return data as FetchAllResourceResponseType
    }
    catch (err) {
        const errors = ErrorHandler(err)
        _thunkAPI.rejectWithValue(errors)
        return Promise.reject(errors)
    }
})



export const restoreFromTrashAsync = createAsyncThunk<string, { resourceId: string }>("restoreFromTrashAsync", async (payload, _thunkAPI) => {
    try {
        await restoreFromTrashApi(payload?.resourceId)
        return payload?.resourceId
    }
    catch (err) {
        const errors = ErrorHandler(err)
        _thunkAPI.rejectWithValue(errors)
        return Promise.reject(errors)
    }
})


export const deleteBinResourceByIdAsync = createAsyncThunk<string, { resourceId: string }>("deleteBinResourceByIdAsync", async (payload, _thunkAPI) => {
    try {
        await deleteForeverApi(payload?.resourceId)
        return payload?.resourceId
    }
    catch (err) {
        const errors = ErrorHandler(err)
        _thunkAPI.rejectWithValue(errors)
        return Promise.reject(errors)
    }
})
