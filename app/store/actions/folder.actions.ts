import { createAction } from "@reduxjs/toolkit";
import { FolderDataType } from "../reducers/folders.reducers";

type AddFolderType = {
	name: string;
};

type RenameFolderType = {
	folderId: string;
	name: string;
};

type AddBulkFolder = {
	data: FolderDataType[];
};

export const addFolder = createAction<AddFolderType>("addFolder");
export const renameFolder = createAction<RenameFolderType>("renameFolder");
export const addBulkFolder = createAction<AddBulkFolder>("addBulkFolder");
