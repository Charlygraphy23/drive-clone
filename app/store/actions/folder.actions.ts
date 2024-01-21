import { createAction } from "@reduxjs/toolkit";

type AddFolderType = {
	name: string;
};

export const addFolder = createAction<AddFolderType>("addFolder");
