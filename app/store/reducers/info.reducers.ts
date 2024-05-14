import { createReducer } from "@reduxjs/toolkit";
import { clearSelectedFolderId, getFolderInfoAsync, ResourceInfoDataType, toggleInfo } from "../actions/info.actions";

const initialState = {
    loading: false,
    data: {} as Record<string, ResourceInfoDataType>,
    error: "",
    show: false,
    selectedFolderId: ""
};


export type ResourceInfoStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getFolderInfoAsync.pending, (state, action) => {
            state.loading = true;
            state.selectedFolderId = action.meta.arg.folderId;
            state.error = "";
            return state
        })
        .addCase(getFolderInfoAsync.fulfilled, (state, action) => {
            const ID = action.payload._id
            state.loading = false;
            state.error = "";
            state.data[ID] = action.payload
            state.selectedFolderId = ID
            return state;
        })
        .addCase(getFolderInfoAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "";
            return state;
        })
        .addCase(clearSelectedFolderId, (state) => {
            state.selectedFolderId = ""
            return state;
        })
        .addCase(toggleInfo, (state) => {
            state.show = !state.show;
            return state;
        });
});
