import { createAction } from "@reduxjs/toolkit";

type CreateFileActionType = {
	name: string;
};


type RenameFile = {
	fileId: string;
	name: string
};


export const createFile = createAction<CreateFileActionType>("createFile");
export const renameFile = createAction<RenameFile>("renameFile");