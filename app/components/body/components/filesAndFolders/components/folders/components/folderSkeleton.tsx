"use client";

import React from "react";
import style from "../../../style.module.scss";
import MyDropdown from "@/app/components/dropdown";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { RENAME_MODAL_ID } from "../utils/consts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Modal } from "bootstrap";

type Props = {
	data: FolderDataType;
};

const FolderSkeleton = ({ data }: Props) => {
	const state = useSelector<RootState, Record<string, any>>(
		(state) => state.modals
	);
	const renameModalInstance = state?.[RENAME_MODAL_ID] as Modal;

	const handleRenameClient = () => {
		renameModalInstance.toggle();
	};

	return (
		<div className={style.skeleton}>
			<div className={`${style.label} d-flex`}>
				<i className='bi bi-folder-fill'></i>
				<p>{data?.name}</p>
			</div>

			<MyDropdown
				className={style.dropdown}
				handler={{
					className: style.dropdownItem,
					render: () => <i className='bi bi-three-dots-vertical'></i>,
				}}>
				<MyDropdown.Menu>
					<MyDropdown.List className='d-flex' onClick={handleRenameClient}>
						<i className='bi bi-pen-fill'></i>
						<span> Rename </span>
					</MyDropdown.List>

					<MyDropdown.List divider></MyDropdown.List>

					<MyDropdown.List className='d-flex'>
						<i className='bi bi-trash3-fill'></i>
						<span> Move to trash </span>
					</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
		</div>
	);
};

export default FolderSkeleton;
