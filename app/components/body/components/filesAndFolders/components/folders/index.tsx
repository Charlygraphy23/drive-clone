"use client";

import React from "react";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ModalComponent from "@/app/components/modal";
import { RENAME_MODAL_ID } from "./utils/consts";
import RenameFolder from "./components/renameFolder";

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

			<ModalComponent id={RENAME_MODAL_ID}>
				<RenameFolder />
			</ModalComponent>
		</div>
	);
};

export default FolderComponent;
