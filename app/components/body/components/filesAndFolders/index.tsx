import React from "react";
import FolderComponent from "./components/folders";
import style from "./style.module.scss";

const FilesAndFolders = () => {
	return (
		<div className={style.filesAndFolders}>
			<FolderComponent />
		</div>
	);
};

export default FilesAndFolders;
