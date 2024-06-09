
import { getResources } from "@/app/api/resources/_fetch";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import EmptySection from "./components/emptySection";
import FileSection from "./components/files";
import FolderComponent from "./components/folders";
import { ResourceDatasetType } from "./interfaces/index.interface";
import FileAndFolderStateProvider from "./provider";


async function fetchData(folderId?: string) {
	const dataset = await getResources(folderId, DATA_TYPE.FOLDER, false, "show");
	const response = JSON.parse(JSON.stringify(dataset?.data))
	return response?.resources as ResourceDatasetType["folders"]
}

async function initialFileData(folderId?: string) {
	const dataset = await getResources(folderId, DATA_TYPE.FILE, false, "show", 1, 10);
	const response = JSON.parse(JSON.stringify(dataset?.data))
	return response?.resources as ResourceDatasetType["files"]
}

type Props = {
	folderId?: string
}


const Resources = async ({ folderId }: Props) => {
	const folderData = await fetchData(folderId)
	const fileData = await initialFileData(folderId)

	return (
		<FileAndFolderStateProvider id={folderId} data={{ folders: folderData, files: fileData } as ResourceDatasetType}>
			<FolderComponent />
			<FileSection />
			<EmptySection />
		</FileAndFolderStateProvider>
	);
};

export default Resources;
