import { addFolderApi, updateFolderNameApi, UpdateFolderNamePayload } from "@/app/_apis_routes/filesAndFolder";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FolderDataType } from "../reducers/folders.reducers";

type AddFolderType = {
	name: string;
	createdBy: string;
	reset: () => void;
	parentFolderId?: string
};

type RenameFolderType = {
	folderId: string;
	name: string;
};

type AddBulkFolder = {
	data: FolderDataType[];
};

export const renameFolder = createAction<RenameFolderType>("renameFolder");
export const addBulkFolder = createAction<AddBulkFolder>("addBulkFolder");


export const addFolderAsync = createAsyncThunk<{ id: string } & Omit<AddFolderType, "reset">, AddFolderType>("addFolder", async (payload, _thunkAPI) => {
	const data = await addFolderApi({
		name: payload.name,
		type: DATA_TYPE.FOLDER,
		createdBy: payload?.createdBy,
		parentFolderId: payload?.parentFolderId ?? null
	})

	if (payload?.reset) {
		payload?.reset()
	}
	return {
		id: data._id,
		name: payload.name,
		type: DATA_TYPE.FOLDER,
		createdBy: payload?.createdBy
	}
})

export const renameFolderAsync = createAsyncThunk<{ _id: string, updatedName: string }, UpdateFolderNamePayload>("renameFolder", async (payload, _thunkAPI) => {
	await updateFolderNameApi(payload)
	return {
		_id: payload?.folderId,
		updatedName: payload?.updatedName
	}
})