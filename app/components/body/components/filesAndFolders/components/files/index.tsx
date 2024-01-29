import React from "react";
import style from "../../style.module.scss";
import FileComponent from "./components/fileComponent";
import RenameModal from "../folders/components/renameFolder";

const FileSection = () => {
	return (
		<div className={style.files}>
			<h6 className='mt-5'>Files</h6>

			<div className={style.filesContainer}>
				<FileComponent />
			</div>
			<RenameModal />
		</div>
	);
};

export default FileSection;
