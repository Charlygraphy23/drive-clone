import { addFolderApi, updateFolderNameApi, UpdateFolderNamePayload } from "@/app/_apis_routes/filesAndFolder";
import { DATA_TYPE, FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { ErrorHandler } from "@/app/utils/index.utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FolderDataType } from "../reducers/folders.reducers";

type AddFolderType = {
	reset: () => void;
} & Pick<FilesAndFolderSchemaType, "createdBy" | "name" | "parentFolderId">;


type AddBulkFolder = {
	data: FolderDataType[];
};

export const addBulkFolder = createAction<AddBulkFolder>("addBulkFolder");


export const addFolderAsync = createAsyncThunk<{ id: string, type: DATA_TYPE } & Omit<AddFolderType, "reset">, AddFolderType>("addFolder", async (payload, _thunkAPI) => {
	try {
		const data = await addFolderApi({
			name: payload.name,
			type: DATA_TYPE.FOLDER,
			parentFolderId: payload?.parentFolderId
		})

		if (payload?.reset) {
			payload?.reset()
		}
		return {
			id: data.folderId,
			name: payload.name,
			type: DATA_TYPE.FOLDER,
			createdBy: payload?.createdBy
		}
	}
	catch (err) {
		const errors = ErrorHandler(err)
		return Promise.reject(errors)
	}
})

export const renameFolderAsync = createAsyncThunk<{ _id: string, updatedName: string }, { reset: () => void } & UpdateFolderNamePayload>("renameFolder", async (payload, _thunkAPI) => {
	try {
		await updateFolderNameApi(payload)

		if (payload?.reset) {
			payload?.reset()
		}

		return {
			_id: payload?.folderId,
			updatedName: payload?.updatedName
		}
	}
	catch (err) {
		const errors = ErrorHandler(err)
		return Promise.reject(errors)
	}
})