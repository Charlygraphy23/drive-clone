import { createAction } from "@reduxjs/toolkit";

type CreateFileActionType = {
	name: string;
};

export const createFile = createAction<CreateFileActionType>("createFile");
