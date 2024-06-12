"use client";

import { NEW_FOLDER_MODAL_ID } from "@/app/_config/const";
import ButtonGroup from "@/app/components/buttonGroup";
import InputGroup from "@/app/components/inputGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
	addFolderAsync,
	toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";

type Props = {
	isOpen: boolean;
	data: ModalDataType;
};

const NewFolderModal = ({ isOpen }: Props) => {
	const { loading, error } = useAppSelector(
		(state) => state.folders
	);
	const ref = useRef<HTMLInputElement>(null)
	const dispatch = useAppDispatch();
	const [name, setName] = useState<string>("");
	const session = useSession()
	const params = useParams()
	const user = session?.data?.user


	const toggleModal = useCallback((isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "newFolderModal",
			})
		);
	}, [dispatch]);

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

		const folderId = params?.folderId as string ?? null

		dispatch(addFolderAsync({
			name, createdBy: String(user?._id) ?? "", reset: resetState,
			parentFolderId: folderId
		}));
	};

	useEffect(() => {
		if (!ref.current) return;

		if (isOpen) {
			ref.current.focus()
		}
	}, [isOpen])

	return (
		<ModalComponent
			id={NEW_FOLDER_MODAL_ID}
			isOpen={isOpen}
			toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.newfolderModal}>
				<h5>
					<span>New Folder</span>
					<ButtonClose />
				</h5>

				<InputGroup
					type='text'
					value={name}
					onChange={onChange}
					className={style.inputWrapper}
					errorMessage={error}
					ref={ref}
				/>

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<ButtonGroup handleSubmit={() => toggleModal(false)} submitText="cancel" className={`cancel me-4`} />
					<ButtonGroup
						type="submit"
						disabled={!name}
						submitText="OK"
						className={`${style.submit} submit`}
						loading={loading}
						loader="spin"
						order={-1}
					/>
				</div>
			</form>
		</ModalComponent>
	);
};

export default memo(NewFolderModal);
