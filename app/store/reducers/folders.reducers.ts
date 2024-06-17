import { ACCESS_ORIGIN, ACCESS_TYPE, AccessSchemaType } from "@/app/lib/database/interfaces/access.interface";
import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { addBulkFolder, addFolderAsync, moveToTrashFolderAsync, removeAccessFromFolderAsync, renameFolderAsync } from "../actions";

const initialState = {
	loading: false,
	data: [] as FolderDataType[],
	error: "",
};

export type FolderDataType = { _id: string, access: { _id: string } & Partial<Record<keyof AccessSchemaType, string>> } & Partial<FilesAndFolderSchemaType>;

export type FolderStateType = {
	loading: boolean;
	data: FolderDataType[];
	error: string;
};

export default createReducer(initialState, (builder) => {
	builder
		.addCase(removeAccessFromFolderAsync.fulfilled, (state, action) => {
			const payload = action?.payload;
			state.data = state.data.filter(item => item._id !== payload?.resourceId)
			return state;

		})
		.addCase(addFolderAsync.pending, (state) => {
			state.loading = true
			state.error = ""
			return state;
		})
		.addCase(addFolderAsync.fulfilled, (state, action) => {
			state.loading = false
			state.error = ""
			state.data.push({
				_id: action?.payload?.id,
				name: action.payload.name,
				createdBy: action.payload.createdBy,
				dataType: action.payload.type,
				access: {
					_id: Date.now().toString(),
					rootId: "",
					createdFor: "",
					accessType: ACCESS_TYPE.WRITE,
					origin: ACCESS_ORIGIN.SELF
				}
			});
			return state;
		})
		.addCase(addFolderAsync.rejected, (state, action) => {
			state.loading = false
			state.error = action.error?.message ?? ""
			return state;
		})
		.addCase(renameFolderAsync.pending, (state) => {
			state.loading = true
			state.error = ""
			return state;
		})
		.addCase(renameFolderAsync.fulfilled, (state, action) => {
			const payload = action.payload;
			state.loading = false
			state.error = ""
			state.data = state.data.map((folder) => {
				if (folder?._id === payload?._id) folder.name = payload?.updatedName;
				return folder;
			});

			return state;
		})
		.addCase(renameFolderAsync.rejected, (state, action) => {
			state.loading = false
			state.error = action.error?.message ?? ""
			return state;
		})
		.addCase(addBulkFolder, (state, action) => {
			const payload = action.payload;

			state.data = payload?.data;
			return state;
		})
		.addCase(moveToTrashFolderAsync.fulfilled, (state, action) => {
			const folderId = action?.payload?.id
			state.data = state?.data?.filter(folder => folder?._id !== folderId)
			return state;
		});
});
