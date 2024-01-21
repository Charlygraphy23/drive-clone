"use client";

import React from "react";
import style from "../../../style.module.scss";
import MyDropdown from "@/app/components/dropdown";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import ModalComponent from "@/app/components/modal";
import { RENAME_MODAL_ID } from "../utils/consts";

type Props = {
	data: FolderDataType;
};

const FolderSkeleton = ({ data }: Props) => {
	// const handleClick = () => {
	// 	console.log("Hanlde Click");
	// 	const instance = new window.bootstrap.Modal(`#${RENAME_MODAL_ID}`);
	// 	instance.toggle();
	// 	setTimeout(() => {
	// 		console.log("Timeout has been fired");
	// 		instance.hide();
	// 	}, 2000);
	// };

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
					<MyDropdown.List className='d-flex'>
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
