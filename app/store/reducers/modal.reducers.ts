import { createReducer } from "@reduxjs/toolkit";
import { toggleRenameModal } from "../actions";

const initialState = {
	renameModal: false,
	data : {} as Record<string, any>
}

export type ModalStateType = typeof initialState

export default createReducer(initialState, (builder) => {
	builder.addCase(toggleRenameModal, (state, action) => {
		const payload = action?.payload;
		state.renameModal = payload?.isOpen;
		if(payload?.data) state.data = payload.data
		return state
	});
});
