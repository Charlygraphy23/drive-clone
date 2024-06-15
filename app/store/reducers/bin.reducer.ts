import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { addBulkResources, appendBulkResources, restoreFromTrashAsync } from "../actions/bin.actions";
import { FileDataType } from "./files.reducers";

const initialState = {
    isFetching: false,
    isFetched: false,
    loading: true, // for initial page loading before fetching
    data: [] as FileDataType[],
    error: "",
    hasNext: false,
    isSubmitting: false
};

export type BinDataType = { _id: string } & Partial<FilesAndFolderSchemaType>;
export type BinStateType = {
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
        .addCase(restoreFromTrashAsync.pending, (state) => {
            state.isSubmitting = true
            return state;
        })
        .addCase(restoreFromTrashAsync.fulfilled, (state, action) => {
            const payload = action?.payload
            state.isSubmitting = false
            state.data = state?.data.filter(resource => resource?._id !== payload)
            return state;
        })
        .addCase(restoreFromTrashAsync.rejected, (state) => {
            state.isSubmitting = false
            return state;
        })
        .addCase(addBulkResources.pending, (state) => {
            state.loading = true
            state.isFetching = true
            state.isFetched = false
            state.error = ""
            state.hasNext = false
            return state;
        })
        .addCase(addBulkResources.fulfilled, (state, action) => {
            const payload = action?.payload;
            const data = payload.resources
            state.data = data
            state.isFetched = true
            state.hasNext = !!payload.next
            return state;
        })
        .addCase(addBulkResources.rejected, (state, action) => {
            const payload = action?.error.message;
            state.isFetched = false
            state.error = payload ?? ""
            state.hasNext = false

            return state;
        })
        .addCase(appendBulkResources.pending, (state) => {
            state.loading = true
            state.isFetching = true
            state.isFetched = false
            state.error = ""
            state.hasNext = false
            return state;
        })
        .addCase(appendBulkResources.fulfilled, (state, action) => {
            const payload = action?.payload;
            const data = payload.resources
            state.data.push(...data)
            state.isFetched = true
            state.hasNext = !!payload.next
            return state;
        })
        .addCase(appendBulkResources.rejected, (state, action) => {
            const payload = action?.error.message;
            state.isFetched = false
            state.error = payload ?? ""
            state.hasNext = false

            return state;
        })
        .addMatcher(appendBulkResources.settled, (state) => {
            state.loading = false
            state.isFetching = false
            return state;
        })
        .addMatcher(addBulkResources.settled, (state) => {
            state.loading = false
            state.isFetching = false
            return state;
        })

});
