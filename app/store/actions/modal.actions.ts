import { createAction } from "@reduxjs/toolkit";

type OpenModal = {
	instance: Object;
	type: string;
};
export const openModal = createAction<OpenModal>("openModal");
