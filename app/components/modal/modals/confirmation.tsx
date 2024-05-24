"use client";

import { CONFIRM_MODAL_ID } from "@/app/_config/const";
import ModalComponent from "@/app/components/modal";
import { RootState } from "@/app/store";
import { toggleModal as toggleModalState } from "@/app/store/actions";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../../buttonGroup";
import style from "../style.module.scss";

type Props = {
	onSubmit: (_toggle: () => void, _resourceId: string) => void,
	message: string;
	isLoading?: boolean;
};

const ConfirmationModalComponent = ({ onSubmit, message, isLoading = false }: Props) => {
	const { confirmModal, data } = useSelector<RootState, ModalStateType>(
		(state) => state.modals
	);
	const dispatch = useDispatch();

	const toggleModal = useCallback((isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "confirmModal",
			})
		);
	}, [dispatch]);

	const handleModalSubmit = async (event: FormEvent) => {
		event.preventDefault();
		onSubmit(toggleModal, data?.id)
	};

	return (
		<ModalComponent
			id={CONFIRM_MODAL_ID}
			isOpen={confirmModal}
			toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.confirmModal}>
				<h5>
					<span>Confirm</span>
				</h5>

				<p>{message}</p>

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<ButtonGroup
						submitText="cancel"
						className="button cancel me-3"
						handleSubmit={() => {
							if (isLoading) return;
							toggleModal(false)
						}}
						disabled={isLoading}
					/>
					<ButtonGroup
						submitText={isLoading ? "Deleting..." : "OK"}
						className={`button error ${style.submit}`}
						handleSubmit={handleModalSubmit}
						disabled={isLoading}
					/>

				</div>
			</form>
		</ModalComponent>
	);
};

export default ConfirmationModalComponent;
