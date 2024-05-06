import { createReducer } from "@reduxjs/toolkit";
import { getFolderInfoAsync, ResourceInfoDataType, toggleInfo } from "../actions/info.actions";

const initialState = {
    loading: false,
    data: {} as ResourceInfoDataType,
    error: "",
    show: false
};


export type ResourceInfoStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getFolderInfoAsync.pending, (state) => {
            state.loading = true;
            state.error = "";
            return state
        })
        .addCase(getFolderInfoAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload
            return state;
        })
        .addCase(getFolderInfoAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "";
            return state;
        })
        .addCase(toggleInfo, (state) => {
            state.show = !state.show;
            return state;
        });
});
