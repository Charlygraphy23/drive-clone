import { getResourcesApi } from "@/app/_apis_routes/resources";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FileDataType } from "../reducers/files.reducers";

type CreateFileActionType = {
	name: string;
};

type AddBulkFiles = {
	data: FileDataType[];
	next?: boolean
};

type RenameFile = {
	resourceId: string;
	name: string;
};

export const addBulkFiles = createAction<AddBulkFiles>("addBulkFiles");
export const createFile = createAction<CreateFileActionType>("createFile");
export const renameFile = createAction<RenameFile>("renameFile")
export const pushFile = createAction<FileDataType>("pushFile")



export const appendBulkFiles = createAsyncThunk<AddBulkFiles, { folderId?: string, page: number, limit: number }>("appendBulkFiles", async (payload, _thunkAPI) => {
	try {
		const data = await getResourcesApi(payload)
		return data
	}
	catch (err) {
		const errors = ErrorHandler(err)
		_thunkAPI.rejectWithValue(errors)
		return Promise.reject(errors)
	}
})