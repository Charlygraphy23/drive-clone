import { createReducer } from "@reduxjs/toolkit";
import { addBulkFiles, createFile, renameFile } from "../actions";

const initialState = {
	loading: false,
	data: [] as FileDataType[],
	error: "",
};

export type FileDataType = {
	_id: string;
	name: string;
	lastModified: string;
	member?: string;
};
export type FolderStateType = {
	loading: boolean;
	data: FileDataType[];
	error: string;
};
export default createReducer(initialState, (builder) => {
	builder
		.addCase(createFile, (state, action) => {
			const payload = action?.payload;

			state.data.push({
				_id: Date.now().toString(),
				name: payload?.name,
				member: "",
				lastModified: new Date().toLocaleDateString(),
			});
			return state;
		})
		.addCase(renameFile, (state, action) => {
			const payload = action?.payload;

			state.data.forEach((file) => {
				if (file?._id === payload?.fileId) {
					file.name = payload?.name;
				}
			});
			return state;
		}).addCase(addBulkFiles, (state, action) => {
			const payload = action?.payload;

			state.data.push(...payload?.data);
			return state;
		});
});
