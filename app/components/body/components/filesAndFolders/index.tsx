import React from "react";
import FolderComponent from "./components/folders";
import style from "./style.module.scss";
import FileSection from "./components/files";
import FileAndFolderStateProvider from "./provider";

const data = {
	files: [],
	folders: [],
};

const api = async () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, 5000);
	});
};

const FilesAndFolders = async () => {
	const dataset = await api();

	return (
		<FileAndFolderStateProvider data={dataset}>
			<div className={style.filesAndFolders}>
				<FolderComponent />
				<FileSection />
			</div>
		</FileAndFolderStateProvider>
	);
};

export default FilesAndFolders;
