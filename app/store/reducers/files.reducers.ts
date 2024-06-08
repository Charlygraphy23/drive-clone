import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { addBulkFiles, createFile, renameFile } from "../actions";

const initialState = {
	loading: false,
	data: [] as FileDataType[],
	error: "",
};

export type FileDataType = { _id: string } & Partial<FilesAndFolderSchemaType>;
export type FileStateType = {
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
				lastModified: new Date().toLocaleDateString(),
			});
			return state;
		})
		.addCase(renameFile, (state, action) => {
			const payload = action?.payload;

			state.data.forEach((file) => {
				if (file?._id === payload?.resourceId) {
					file.name = payload?.name;
				}
			});
			return state;
		})
		.addCase(addBulkFiles, (state, action) => {
			const payload = action?.payload;

			state.data = payload?.data;
			return state;
		});
});
