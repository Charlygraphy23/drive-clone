"use client"

import { useAppSelector } from "@/app/store";
import style from "../../style.module.scss";
import FileComponent from "./components/fileComponent";

type Props = { lastItemRef?: React.Ref<any>, isShared?: boolean }

const FileSection = ({ lastItemRef, isShared }: Props) => {
	const { data: files } = useAppSelector(state => state.files)

	return (
		<>
			{files?.length && <div className={style.files}>
				<h6>Files {files?.length > 0 ? <>({files?.length})</> : null}</h6>

				<div className={style.filesContainer}>
					<FileComponent lastItemRef={lastItemRef} isShared={isShared} />
				</div>
			</div> || null}
		</>
	);
};

export default FileSection;
