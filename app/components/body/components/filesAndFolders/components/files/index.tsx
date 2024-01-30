import React from "react";
import style from "../../style.module.scss";
import FileComponent from "./components/fileComponent";

const FileSection = () => {
	return (
		<div className={style.files}>
			<h6 className='mt-5'>Files</h6>

			<div className={style.filesContainer}>
				<FileComponent />
			</div>
		</div>
	);
};

export default FileSection;
