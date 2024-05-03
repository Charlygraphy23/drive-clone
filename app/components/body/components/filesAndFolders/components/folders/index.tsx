"use client";

import { useAppSelector } from "@/app/store";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";


const FolderComponent = () => {
	const { data } = useAppSelector(state => state.folders)

	return (
		<div className={style.folders}>
			<h6>Folders</h6>

			<div className={style.folderContainer}>
				{data.map((folder, index) => (
					<FolderSkeleton data={folder} key={index} />
				))}
			</div>
		</div>
	);
};

export default FolderComponent;
