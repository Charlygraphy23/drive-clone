"use client";

import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { CHANGE_PASSWORD_MODAL } from "@/app/config/const";
import { toggleModal as toggleModalState } from "@/app/store/actions";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import style from "../../style.module.scss";

type Props = {
	isOpen: boolean;
};

const changePasswordApi = () =>
	new Promise((resolve) => setTimeout(() => resolve(true), 5000));

const ChangePasswordModal = ({ isOpen }: Props) => {
	const [state, setState] = useState({
		newPassword: "",
		confirmPassword: "",
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: changePasswordApi,
	});
	const dispatch = useDispatch();
	const toggleModal = useCallback((isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "changePasswordModal",
			})
		);
	}, [dispatch]);

	const handleModalSubmit = async (event: FormEvent) => {
		event.preventDefault();
		console.log("Modal submit");

		if (isPending) return;

		await mutateAsync();
		toggleModal(false);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, [event.target.id]: event.target.value }));
	};

	const handleCancel = () => {
		if (isPending) return;
		toggleModal(false);
	};

	return (
		<ModalComponent
			id={CHANGE_PASSWORD_MODAL}
			isOpen={isOpen}
			toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.changePassword}>
				<h5>
					<span>Change Password</span>
					<ButtonClose />
				</h5>

				<label htmlFor='newPassword'>
					<span>New Password</span>
					<input
						placeholder='Enter new password'
						id='newPassword'
						type='text'
						value={state.newPassword}
						onChange={onChange}
						autoComplete='off'
					/>
				</label>

				<label htmlFor='confirmPassword'>
					<span>Confirm Password</span>
					<input
						placeholder='Enter confirm password'
						type='password'
						id='confirmPassword'
						value={state.confirmPassword}
						onChange={onChange}
						autoComplete='off'
					/>
				</label>

				<div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
					<button
						type='button'
						className='button cancel me-3'
						onClick={handleCancel}
						disabled={isPending}>
						cancel
					</button>
					<button type='submit' className='button submit' disabled={isPending}>
						{isPending ? (
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

export default ChangePasswordModal;
