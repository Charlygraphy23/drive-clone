import { FilesAndFolderSchemaType } from "@/app/lib/database/interfaces/files.interfaces";
import { UserSchemaType } from "@/app/lib/database/interfaces/user.interface";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";

export type FileAndFolderDatasetType = {
	files: FileDataType[];
	folders: FolderDataType[];
};


export type OwnerAccessObject = {
	userInfo: Pick<UserSchemaType, "_id" | "firstName" | "lastName" | "email" | "imageUrl">
} & FilesAndFolderSchemaType