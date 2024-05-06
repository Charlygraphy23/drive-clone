import { FileDataType } from "@/app/store/reducers/files.reducers";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";

export type FileAndFolderDatasetType = {
	files: FileDataType[];
	folders: FolderDataType[];
};


export type OwnerAccessObject = {
	profileImage: string;
	email: string
}