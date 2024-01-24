import { createReducer } from "@reduxjs/toolkit";
import { toggleRenameModal } from "../actions";

const initialState = {
	renameModal: false
}

export type ModalStateType = typeof initialState

export default createReducer(initialState, (builder) => {
	builder.addCase(toggleRenameModal, (state, action) => {
		const payload = action?.payload;
		state.renameModal = payload
		return state;
	});
});
