import { createAction } from "@reduxjs/toolkit";
import { ModalDataType } from "../reducers/modal.reducers";

type ToggleModal = {
	isOpen: boolean;
	data?: ModalDataType | null;
};

export const toggleRenameModal =
	createAction<ToggleModal>("toggleRenameModal");


export const toggleNewFolderModal =
createAction<ToggleModal>("toggleNewFolderModal");
