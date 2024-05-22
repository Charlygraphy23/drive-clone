"use client";

import ButtonGroup from "@/app/components/buttonGroup";
import InputGroup from "@/app/components/inputGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { RENAME_MODAL_ID } from "@/app/config/const";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
	renameFile,
	renameFolderAsync,
	toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { useRouter } from "next/navigation";
import {
	ChangeEvent,
	FormEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import style from "./style.module.scss";

type Props = {
	isOpen: boolean;
	data: ModalDataType;
};

const RenameModal = ({ isOpen, data }: Props) => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector(state => state.folders);
	const router = useRouter()

	const [name, setName] = useState<string>("");
	const currName = useRef(name);

	const toggleModal = useCallback((isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "renameModal",
			})
		);

		const value = data?.value ?? "";

		setName(value as string);
	}, [data?.value, dispatch]);

	const resetModal = () => {
		toggleModal(false);
		setName("");
		router.refresh()
	}

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleModalSubmit = (event: FormEvent) => {
		event.preventDefault();

		if (loading) return;

		if (!name) return;

		if (data && data.type === DATA_TYPE.FILE) {
			dispatch(renameFile({ resourceId: data?.id, name }));
		} else {
			dispatch(renameFolderAsync({ id: data?.id, updatedName: name, reset: resetModal }));
		}
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
					<ButtonClose />
				</h5>

				<InputGroup type="text" value={name} onChange={onChange} className={style.inputWrapper} errorMessage={error} />

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<ButtonGroup
						type='button'
						className='cancel me-4'
						handleSubmit={() => toggleModal(false)} submitText="cancel" />

					<ButtonGroup
						disabled={!name}
						type='submit'
						className={`${style.submit} submit`}
						submitText="Ok"
						loading={loading}
						loader="spin"
					/>

				</div>
			</form>
		</ModalComponent>
	);
};

export default memo(RenameModal);
