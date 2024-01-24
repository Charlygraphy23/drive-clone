import { createAction } from "@reduxjs/toolkit";

type ToggleRenameModal = {
	isOpen : boolean,
	data?: Record<string, any> | null
}

export const toggleRenameModal = createAction<ToggleRenameModal>("toggleRenameModal");

