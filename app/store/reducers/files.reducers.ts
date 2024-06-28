import { ACCESS_ORIGIN, ACCESS_TYPE, AccessSchemaType } from "@/app/lib/database/interfaces/access.interface";
import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { addBulkFiles, appendBulkFiles, createFile, moveToTrashFileAsync, pushFile, removeAccessFromFileAsync, renameFileAsync } from "../actions";

const initialState = {
	isFetching: false,
	isFetched: false,
	loading: false,
	data: [] as FileDataType[],
	error: "",
	hasNext: false,
	isSubmitting: false
};

export type FileDataType = { _id: string, access: { _id: string } & Partial<Record<keyof AccessSchemaType, string>> } & Partial<FilesAndFolderSchemaType>;
export type FileStateType = {
	isFetching: boolean,
	isFetched: boolean,
	loading: boolean;
	data: FileDataType[];
	error: string;
	hasNext?: boolean;
	isSubmitting?: boolean;
};
export default createReducer(initialState, (builder) => {
	builder
		.addCase(removeAccessFromFileAsync.fulfilled, (state, action) => {
			const payload = action?.payload;
			state.data = state.data.filter(item => item._id !== payload?.resourceId)
			return state;

		})
		.addCase(createFile, (state, action) => {
			const payload = action?.payload;

			state.data.push({
				_id: Date.now().toString(),
				name: payload?.name,
				lastModified: new Date().toLocaleDateString(),
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
		.addCase(renameFileAsync.pending, (state) => {
			state.isSubmitting = true
			state.error = ""
			return state;
		})
		.addCase(renameFileAsync.fulfilled, (state, action) => {
			const payload = action.payload;
			state.isSubmitting = false
			state.error = ""
			state.data = state.data.map((folder) => {
				if (folder?._id === payload?._id) folder.name = payload?.updatedName;
				return folder;
			});

			return state;
		})
		.addCase(renameFileAsync.rejected, (state, action) => {
			state.isSubmitting = false
			state.error = action.error?.message ?? ""
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
		.addCase(pushFile, (state, action) => {
			const payload = action?.payload;

			if (!state.hasNext) {
				state.data.push(payload);
			}

			return state;
		})
		.addCase(moveToTrashFileAsync.fulfilled, (state, action) => {
			const fileId = action?.payload?.id
			state.data = state?.data?.filter(file => file?._id !== fileId)
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
		})

});
