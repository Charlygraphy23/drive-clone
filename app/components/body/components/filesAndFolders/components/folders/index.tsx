"use client";

import React from "react";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const FolderComponent = () => {
	const { data } = useSelector<RootState, RootState["folders"]>(
		(state) => state.folders
	);

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
