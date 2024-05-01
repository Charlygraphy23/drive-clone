import { createReducer } from "@reduxjs/toolkit";
import { addBulkFolder, addFolderAsync, renameFolder } from "../actions";

const initialState = {
	loading: false,
	data: [] as FolderDataType[],
	error: "",
};

export type FolderDataType = {
	_id: string;
	name: string;
	path?: string;
};
export type FolderStateType = {
	loading: boolean;
	data: FolderDataType[];
	error: string;
};

export default createReducer(initialState, (builder) => {
	builder
		.addCase(addFolderAsync.pending, (state) => {
			state.loading = true
			return state;
		})
		.addCase(addFolderAsync.fulfilled, (state, action) => {
			state.loading = false
			state.data.push({
				_id: action?.payload?.id,
				name: action.payload.name,
			});
			return state;
		})
		.addCase(addFolderAsync.rejected, (state) => {
			state.loading = false
			return state;
		})
		.addCase(renameFolder, (state, action) => {
			const payload = action.payload;

			state.data = state.data.map((folder) => {
				if (folder?._id === payload?.folderId) folder.name = payload?.name;
				return folder;
			});

			return state;
		})
		.addCase(addBulkFolder, (state, action) => {
			const payload = action.payload;

			state.data = payload?.data;
			return state;
		});
});
