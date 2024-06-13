import { getResourcesApi, moveToTrashResourceApi, updateFileNameApi, UpdateFolderNamePayload } from "@/app/_apis_routes/resources";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FileDataType } from "../reducers/files.reducers";
import { updateInfo } from "./info.actions";

type CreateFileActionType = {
	name: string;
};

type AddBulkFiles = {
	data: FileDataType[];
	next?: boolean
};

export const addBulkFiles = createAction<AddBulkFiles>("addBulkFiles");
export const createFile = createAction<CreateFileActionType>("createFile");
export const pushFile = createAction<FileDataType>("pushFile")

export const renameFileAsync = createAsyncThunk<{ _id: string, updatedName: string }, { reset: () => void } & UpdateFolderNamePayload>("renameFile", async (payload, _thunkAPI) => {
	try {
		await updateFileNameApi(payload)


		if (payload?.reset) {
			payload?.reset()
			_thunkAPI.dispatch(updateInfo({
				id: payload?.id,
				data: {
					name: payload?.updatedName
				}
			}))
		}
		return {
			_id: payload?.id,
			updatedName: payload?.updatedName
		}
	}
	catch (err) {
		const errors = ErrorHandler(err)
		return Promise.reject(errors)
	}
})

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


export const moveToTrashFileAsync = createAsyncThunk<{ id: string }, { id: string }>("moveToTrashFile", async ({ id }, _thunkAPI) => {
	try {
		await moveToTrashResourceApi(id)
		return {
			id
		}
	}
	catch (err) {
		const errors = ErrorHandler(err)
		_thunkAPI.rejectWithValue(errors)
		return Promise.reject(errors)
	}
})