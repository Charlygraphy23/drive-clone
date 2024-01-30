import { createAction } from "@reduxjs/toolkit";

type AddFolderType = {
	name: string;
};

type RenameFolderType = {
	folderId: string;
	name: string
};

export const addFolder = createAction<AddFolderType>("addFolder");
export const renameFolder = createAction<RenameFolderType>("renameFolder");
export const renameFolder = createAction<RenameFolderType>("renameFolder");

