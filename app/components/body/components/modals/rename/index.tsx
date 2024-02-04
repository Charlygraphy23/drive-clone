"use client";

import React, {
	ChangeEvent,
	FormEvent,
	memo,
	useEffect,
	useRef,
	useState,
} from "react";
import style from "./style.module.scss";
import ModalComponent from "@/app/components/modal";
import {
	renameFile,
	renameFolder,
	toggleRenameModal,
} from "@/app/store/actions";
import { useDispatch } from "react-redux";
import { RENAME_MODAL_ID } from "@/app/config/const";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { DATA_TYPE } from "@/app/interfaces/index.interface";

type Props = {
	isOpen: boolean;
	data: ModalDataType;
};

const RenameModal = ({ isOpen, data }: Props) => {
	const dispatch = useDispatch();
	const [name, setName] = useState<string>("");
	const currName = useRef(name);

	const toggleModal = (isOpen?: boolean) => {
		dispatch(
			toggleRenameModal({
				isOpen: !!isOpen,
			})
		);

		if (data && data.value) {
		}

		const value = data?.value ?? "";

		setName(value as string);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleModalSubmit = (event: FormEvent) => {
		event.preventDefault();

		if (!name) return;

		if (data && data.type === DATA_TYPE.FILE) {
			dispatch(renameFile({ fileId: data?.fileId, name }));
		} else {
			dispatch(renameFolder({ folderId: data?.folderId, name }));
		}

		toggleModal(false);
		setName("");
	};

	useEffect(() => {
		if (currName.current === data?.value) return;
		currName.current = data?.value ?? "";

		setName(data?.value ?? "");
	}, [data?.value]);

	return (
		<ModalComponent id={RENAME_MODAL_ID} isOpen={isOpen} toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.renameModal}>
				<h5>
					<span>Rename</span>
					<ModalComponent.ButtonClose />
				</h5>

				<input type='text' value={name} onChange={onChange} />

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<button
						type='button'
						className='button cancel me-3'
						onClick={() => toggleModal(false)}>
						cancel
					</button>
					<button type='submit' className='button submit'>
						OK
					</button>
				</div>
			</form>
		</ModalComponent>
	);
};

export default memo(RenameModal);
