import { createReducer } from "@reduxjs/toolkit";
import { toggleModal } from "../actions";
import { DATA_TYPE } from "@/app/interfaces/index.interface";

export type ModalDataType = { value: string } & (
	| {
			fileId: string;
			type: DATA_TYPE.FILE;
	  }
	| {
			folderId: string;
			type: DATA_TYPE.FOLDER;
	  }
);

const initialState = {
	renameModal: false,
	newFolderModal: false,
	confirmModal: false,
	changePasswordModal: false,
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
