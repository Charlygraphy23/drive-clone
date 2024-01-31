import { createAction } from "@reduxjs/toolkit";
import { ModalDataType } from "../reducers/modal.reducers";

type ToggleRenameModal = {
	isOpen: boolean;
	data?: ModalDataType | null;
};

export const toggleRenameModal =
	createAction<ToggleRenameModal>("toggleRenameModal");
