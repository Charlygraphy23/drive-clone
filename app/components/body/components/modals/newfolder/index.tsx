"use client";

import ModalComponent from "@/app/components/modal";
import { NEW_FOLDER_MODAL_ID } from "@/app/config/const";
import { RootState, useAppDispatch } from "@/app/store";
import {
	addFolderAsync,
	toggleModal as toggleModalState
} from "@/app/store/actions";
import { FolderStateType } from "@/app/store/reducers/folders.reducers";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, memo, useState } from "react";
import { useSelector } from "react-redux";
import style from "./style.module.scss";

type Props = {
	isOpen: boolean;
	data: ModalDataType;
};

const NewFolderModal = ({ isOpen }: Props) => {
	const { loading } = useSelector<RootState, FolderStateType>(
		(state) => state.folders
	);
	const dispatch = useAppDispatch();
	const [name, setName] = useState<string>("");
	const session = useSession()
	const user = session?.data?.user
	const params = useParams()

	const toggleModal = (isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "newFolderModal",
			})
		);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const resetState = () => {
		toggleModal(false);
		setName("");
	}

	const handleModalSubmit = (event: FormEvent) => {
		event.preventDefault();

		if (loading) return;

		if (!name) return;

		const folderId = params?.folderId ?? null

		dispatch(addFolderAsync({
			name, createdBy: user?.id ?? "", reset: resetState,
			parentFolderId: folderId
		}));


	};

	return (
		<ModalComponent
			id={NEW_FOLDER_MODAL_ID}
			isOpen={isOpen}
			toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.newfolderModal}>
				<h5>
					<span>New Folder</span>
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
						{loading ? "Loading" : "OK"}
					</button>
				</div>
			</form>
		</ModalComponent>
	);
};

export default memo(NewFolderModal);
