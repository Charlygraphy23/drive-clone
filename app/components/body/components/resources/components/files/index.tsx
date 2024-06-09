"use client"

import { useAppSelector } from "@/app/store";
import style from "../../style.module.scss";
import FileComponent from "./components/fileComponent";

type Props = { lastItemRef?: React.Ref<any> }

const FileSection = ({ lastItemRef }: Props) => {
	const { data: files } = useAppSelector(state => state.files)

	return (
		<>
			{files?.length && <div className={style.files}>
				<h6>Files</h6>

				<div className={style.filesContainer}>
					<FileComponent lastItemRef={lastItemRef} />
				</div>
			</div> || null}
		</>
	);
};

export default FileSection;
