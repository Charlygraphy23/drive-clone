import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { toggleModal } from "../actions";

export type ModalDataType = { id: string, value?: string, type?: DATA_TYPE } & Record<string, any>

const initialState = {
	renameModal: false,
	newFolderModal: false,
	confirmModal: false,
	changePasswordModal: false,
	manageAccessModal: false,
	deleteModal: false,
	fileUpload: false,
	previewModal: true,
	data: {} as ModalDataType,
};

export type ModalStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
	builder.addCase(toggleModal, (state, action) => {
		const payload = action?.payload;
		const fieldName = payload?.name;
		state[fieldName] = payload?.isOpen;
		state.data = payload.data as unknown as ModalDataType;

		return state;
	});
});
