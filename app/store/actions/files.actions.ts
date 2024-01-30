import { createAction } from "@reduxjs/toolkit";

type CreateFileActionType = {
	name: string;
};


type AddBulkFiles = {
	data : {
		_id: string;
		name: string,
		member: string,
		lastModified: string,
	}[]
};


type RenameFile = {
	fileId: string;
	name: string
};

export const addBulkFiles = createAction<AddBulkFiles>("addBulkFiles",);
export const createFile = createAction<CreateFileActionType>("createFile");
export const renameFile = createAction<RenameFile>("renameFile");