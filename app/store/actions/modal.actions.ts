import { createAction } from "@reduxjs/toolkit";
import { ModalDataType, ModalStateType } from "../reducers/modal.reducers";

export type ToggleModalType = {
	isOpen: boolean;
	data?: ModalDataType | null;
	name: keyof Pick<
		ModalStateType,
		"renameModal" | "confirmModal" | "newFolderModal" | "changePasswordModal" | "manageAccessModal" | "deleteModal" | "fileUpload" | "previewModal"
	>;
};

export const toggleModal = createAction<ToggleModalType>("toggleModal");
