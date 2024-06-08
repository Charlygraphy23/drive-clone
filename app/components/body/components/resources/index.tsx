
import { getResources } from "@/app/api/resources/_fetch";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import EmptySection from "./components/emptySection";
import FileSection from "./components/files";
import FolderComponent from "./components/folders";
import { ResourceDatasetType } from "./interfaces/index.interface";
import FileAndFolderStateProvider from "./provider";
import style from "./style.module.scss";


// const _data = {
// 	files: [
// 		{
// 			_id: "afsdfsdfs",
// 			name: "Monthly report July",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 			lastModified: new Date().toDateString(),
// 		},
// 		{
// 			_id: "3422",
// 			name: "Campaign plan 2024",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 			lastModified: new Date().toDateString(),
// 		},

// 		{
// 			_id: "afsdfasd34sdfs",
// 			name: "Quick CV portfolio",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 			lastModified: new Date().toDateString(),
// 		},
// 		{
// 			_id: "afss3423dfsdfs",
// 			name: "Quick CV portfolio",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 			lastModified: new Date().toDateString(),
// 		},
// 		{
// 			_id: "afsdfsasdas432dfs",
// 			name: "Quick CV portfolio",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 			lastModified: new Date().toDateString(),
// 		},
// 	],
// 	folders: [
// 		{
// 			_id: "asdkj21233123",
// 			name: "Dummy",
// 			path: "dummy",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 		},
// 		{
// 			_id: "sad312e231",
// 			name: "my folder",
// 			path: "myfolder",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 		},
// 		{
// 			_id: "sad312asdde231",
// 			name: "my  dummy folder",
// 			path: "myfolder",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 		},

// 		{
// 			_id: "333adsdadasd",
// 			name: "my  dummy folder",
// 			path: "myfolder",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 		},

// 		{
// 			_id: "asd324234",
// 			name: "my  dummy folder",
// 			path: "myfolder",
// 			owner: {
// 				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
// 				email: "randomemail@gmail.com"
// 			},
// 		},
// 	],
// };

async function fetchData(folderId?: string) {
	const dataset = await getResources(folderId, DATA_TYPE.FOLDER, false, "show");
	return JSON.parse(JSON.stringify(dataset?.data)) as ResourceDatasetType["folders"]

}

async function initialFileData(folderId?: string) {
	const dataset = await getResources(folderId, DATA_TYPE.FILE, false, "show", 1, 10);
	return JSON.parse(JSON.stringify(dataset?.data)) as ResourceDatasetType["files"]

}

type Props = {
	folderId?: string
}


const Resources = async ({ folderId }: Props) => {
	const folderData = await fetchData(folderId)
	const fileData = await initialFileData(folderId)

	return (
		<FileAndFolderStateProvider id={folderId} data={{ folders: folderData, files: fileData } as ResourceDatasetType}>
			<div className={style.filesAndFolders}>
				<FolderComponent />
				<FileSection />
				<EmptySection />
			</div>
		</FileAndFolderStateProvider>
	);
};

export default Resources;
