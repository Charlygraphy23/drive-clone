"use client"

import { useAppSelector } from "@/app/store";
import style from "../../style.module.scss";
import FileComponent from "./components/fileComponent";



const FileSection = () => {
	const { data: files } = useAppSelector(state => state.files)

	return (
		<>
			{files?.length && <div className={style.files}>
				<h6>Files</h6>

				<div className={style.filesContainer}>
					<FileComponent />
				</div>
			</div> || null}
		</>
	);
};

export default FileSection;
