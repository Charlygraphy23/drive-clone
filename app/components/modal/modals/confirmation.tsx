"use client";

import { CONFIRM_MODAL_ID } from "@/app/config/const";
import React, { FormEvent } from "react";
import style from "../style.module.scss";
import ModalComponent from "@/app/components/modal";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal as toggleModalState } from "@/app/store/actions";
import { RootState } from "@/app/store";
import { useMutation } from "@tanstack/react-query";
import { Rings } from "react-loader-spinner";

type Props = {
	api: () => Promise<any>;
	message: string;
};

const ConfirmationModalComponent = ({ api, message }: Props) => {
	const { confirmModal } = useSelector<RootState, ModalStateType>(
		(state) => state.modals
	);
	const mutation = useMutation({ mutationFn: api });
	const dispatch = useDispatch();
	const toggleModal = (isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "confirmModal",
			})
		);
	};

	const handleModalSubmit = async (event: FormEvent) => {
		event.preventDefault();
		await mutation.mutateAsync();
		console.log("Submited");
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
					<button
						type='button'
						className='button cancel me-3'
						onClick={() => toggleModal(false)}
						disabled={mutation.isPending}>
						cancel
					</button>
					<button
						type='submit'
						className='button error'
						disabled={mutation.isPending}>
						{mutation.isPending ? (
							<Rings
								visible={true}
								height='25'
								width='25'
								color='white'
								ariaLabel='rings-loading'
								wrapperStyle={{}}
								wrapperClass=''
							/>
						) : (
							<span>OK</span>
						)}
					</button>
				</div>
			</form>
		</ModalComponent>
	);
};

export default ConfirmationModalComponent;
