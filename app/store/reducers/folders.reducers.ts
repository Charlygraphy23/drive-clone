import { createReducer } from "@reduxjs/toolkit";
import { addBulkFolder, addFolder, renameFolder } from "../actions";

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
		.addCase(addFolder, (state, action) => {
			state.data.push({
				_id: Date.now().toString(),
				name: action.payload.name,
				path: "myFolder",
			});
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
