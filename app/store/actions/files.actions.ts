import { createAction } from "@reduxjs/toolkit";
import { FileDataType } from "../reducers/files.reducers";

type CreateFileActionType = {
	name: string;
};

type AddBulkFiles = {
	data: FileDataType[];
};

type RenameFile = {
	resourceId: string;
	name: string;
};

export const addBulkFiles = createAction<AddBulkFiles>("addBulkFiles");
export const createFile = createAction<CreateFileActionType>("createFile");
export const renameFile = createAction<RenameFile>("renameFile");
