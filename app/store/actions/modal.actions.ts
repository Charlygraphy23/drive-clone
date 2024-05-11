import { createAction } from "@reduxjs/toolkit";
import { ModalDataType, ModalStateType } from "../reducers/modal.reducers";

type ToggleModal = {
	isOpen: boolean;
	data?: ModalDataType | null;
	name: keyof Pick<
		ModalStateType,
		"renameModal" | "confirmModal" | "newFolderModal" | "changePasswordModal" | "manageAccessModal"
	>;
};

export const toggleModal = createAction<ToggleModal>("toggleModal");
