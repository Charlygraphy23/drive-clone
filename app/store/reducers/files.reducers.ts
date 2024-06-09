import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { addBulkFiles, appendBulkFiles, createFile, renameFile } from "../actions";

const initialState = {
	isFetching: false,
	isFetched: false,
	loading: false,
	data: [] as FileDataType[],
	error: "",
	hasNext: false
};

export type FileDataType = { _id: string } & Partial<FilesAndFolderSchemaType>;
export type FileStateType = {
	isFetching: boolean,
	isFetched: boolean,
	loading: boolean;
	data: FileDataType[];
	error: string;
	hasNext?: boolean;
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
			state.hasNext = !!payload?.next;
			return state;
		})
		.addCase(appendBulkFiles.pending, (state) => {
			state.loading = true
			state.isFetching = true
			state.isFetched = false
			state.error = ""
			state.hasNext = false
			return state;
		})
		.addCase(appendBulkFiles.fulfilled, (state, action) => {
			const payload = action?.payload;
			const data = payload.data
			state.data.push(...data)
			state.isFetched = true
			state.hasNext = !!payload.next
			return state;
		})
		.addCase(appendBulkFiles.rejected, (state, action) => {
			const payload = action?.error.message;
			state.isFetched = false
			state.error = payload ?? ""
			state.hasNext = false

			return state;
		})
		.addMatcher(appendBulkFiles.settled, (state) => {
			state.loading = false
			state.isFetching = false
			return state;
		});
});
