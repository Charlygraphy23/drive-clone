"use client";

import React from "react";
import style from "../../../style.module.scss";
import ModalComponent from "@/app/components/modal";
import { RENAME_MODAL_ID } from "../utils/consts";
import { useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { RootState } from "@/app/store";

const RenameFolder = () => {
	const state = useSelector<RootState, Record<string, any>>(
		(state) => state.modals
	);
	const renameModalInstance = state?.[RENAME_MODAL_ID] as Modal;

	const handleCancel = () => {
		renameModalInstance.toggle();
	};

	return (
		<ModalComponent id={RENAME_MODAL_ID}>
			<div className={style.renameFolder}>
				<h5>
					<span>Rename</span>
					<ModalComponent.ButtonClose />
				</h5>

				<input type='text' />

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<button className='button cancel me-3' onClick={handleCancel}>
						cancel
					</button>
					<button className='button submit'>OK</button>
				</div>
			</div>
		</ModalComponent>
	);
};

export default RenameFolder;
