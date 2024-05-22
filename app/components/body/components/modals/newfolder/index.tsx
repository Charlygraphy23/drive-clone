"use client";

import ButtonGroup from "@/app/components/buttonGroup";
import InputGroup from "@/app/components/inputGroup";
import ModalComponent from "@/app/components/modal";
import { NEW_FOLDER_MODAL_ID } from "@/app/config/const";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
	addFolderAsync,
	toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, memo, useEffect, useRef, useState } from "react";
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
	const router = useRouter()
	const user = session?.data?.user


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
		router.refresh()
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
		ref.current.focus()
		console.log(ref?.current)

	}, [isOpen])

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

				<InputGroup
					type='text'
					value={name}
					onChange={onChange}
					className={style.inputWrapper}
					errorMessage={error}
				// ref={ref}
				/>

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<ButtonGroup handleSubmit={() => toggleModal(false)} submitText="cancel" className={`cancel me-4`} />
					<ButtonGroup type="submit" disabled={!name} submitText="OK" className={`${style.submit} submit`} loading={loading} loader="spin" order={-1} />
				</div>
			</form>
		</ModalComponent>
	);
};

export default memo(NewFolderModal);
