import { createReducer } from "@reduxjs/toolkit";
import { toggleNewFolderModal, toggleRenameModal } from "../actions";
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
	data: {} as ModalDataType,
};

export type ModalStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
	builder
		.addCase(toggleRenameModal, (state, action) => {
			const payload = action?.payload;
			state.renameModal = payload?.isOpen;
			state.data = payload.data as unknown as ModalDataType;

			return state;
		})
		.addCase(toggleNewFolderModal, (state, action) => {
			const payload = action?.payload;
			state.newFolderModal = payload?.isOpen;
			if (payload?.data) state.data = payload.data;
			return state;
		});
});
