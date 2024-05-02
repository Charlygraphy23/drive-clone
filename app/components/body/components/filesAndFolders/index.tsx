import { authOptions } from "@/app/lib/authConfig";
import { connectDB } from "@/app/lib/database/db";
import { FilesAndFolderService } from "@/app/lib/database/services/filesAndFolder.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FileSection from "./components/files";
import FolderComponent from "./components/folders";
import { FileAndFolderDatasetType } from "./interfaces/index.interface";
import FileAndFolderStateProvider from "./provider";
import style from "./style.module.scss";

const data = {
	files: [
		{
			_id: "afsdfsdfs",
			name: "Monthly report July",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
			lastModified: new Date().toDateString(),
		},
		{
			_id: "3422",
			name: "Campaign plan 2024",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
			lastModified: new Date().toDateString(),
		},

		{
			_id: "afsdfasd34sdfs",
			name: "Quick CV portfolio",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
			lastModified: new Date().toDateString(),
		},
		{
			_id: "afss3423dfsdfs",
			name: "Quick CV portfolio",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
			lastModified: new Date().toDateString(),
		},
		{
			_id: "afsdfsasdas432dfs",
			name: "Quick CV portfolio",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
			lastModified: new Date().toDateString(),
		},
	],
	folders: [
		{
			_id: "asdkj21233123",
			name: "Dummy",
			path: "dummy",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
		},
		{
			_id: "sad312e231",
			name: "my folder",
			path: "myfolder",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
		},
		{
			_id: "sad312asdde231",
			name: "my  dummy folder",
			path: "myfolder",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
		},

		{
			_id: "333adsdadasd",
			name: "my  dummy folder",
			path: "myfolder",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
		},

		{
			_id: "asd324234",
			name: "my  dummy folder",
			path: "myfolder",
			owner: {
				profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
				email: "randomemail@gmail.com"
			},
		},
	],
};

const api = async () => {
	return new Promise(async (resolve, reject) => {

		try {

			const session = await getServerSession(authOptions);
			if (!session) return redirect("/login")

			await connectDB()
			const filesAndFolderService = new FilesAndFolderService()
			const folders = await filesAndFolderService.getFolders()

			resolve({
				folders: JSON.parse(JSON.stringify(folders.map(f => f.toJSON()))),
				files: data.files
			})
		}
		catch (err) {
			console.log(err)
			reject(err)
		}
	})

};

const FilesAndFolders = async () => {
	const dataset = await api();

	return (
		<FileAndFolderStateProvider data={dataset as FileAndFolderDatasetType}>
			<div className={style.filesAndFolders}>
				<FolderComponent />
				<FileSection />
			</div>
		</FileAndFolderStateProvider>
	);
};

export default FilesAndFolders;
