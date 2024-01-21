"use client";

import React from "react";
import style from "../../../style.module.scss";
import ModalComponent from "@/app/components/modal";
import { RENAME_MODAL_ID } from "../utils/consts";

const RenameFolder = () => {
	const handleClick = () => {
		console.log("handleClick", window.bootstrap);
		new window.bootstrap.Modal(`#${RENAME_MODAL_ID}`).toggle();
	};

	return (
		<div className={style.renameFolder}>
			<h5>
				<span>Rename</span>
				<ModalComponent.ButtonClose />
			</h5>

			<input type='text' />

			<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
				<button className='button cancel me-3' onClick={handleClick}>
					cancel
				</button>
				<button className='button submit'>OK</button>
			</div>
		</div>
	);
};

export default RenameFolder;
