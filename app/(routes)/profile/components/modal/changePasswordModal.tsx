"use client";

import { changePasswordApi } from "@/app/_apis_routes/user";
import { CHANGE_PASSWORD_MODAL } from "@/app/_config/const";
import ButtonGroup from "@/app/components/buttonGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { PasswordChangeFormErrorStatType, PasswordChangeFormSchema } from "@/app/interfaces/index.interface";
import { toggleModal as toggleModalState } from "@/app/store/actions";
import { ErrorHandler } from "@/app/utils/index.utils";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../../style.module.scss";

type Props = {
	isOpen: boolean;
};

const initialState = {
	newPassword: "",
	confirmPassword: "",
}

const ChangePasswordModal = ({ isOpen }: Props) => {
	const [state, setState] = useState(initialState);
	const [errors, setErrors] = useState<PasswordChangeFormErrorStatType>({
		newPassword: "",
		confirmPassword: ""
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

		if (isPending) return;

		try {
			setErrors({} as PasswordChangeFormErrorStatType)
			await PasswordChangeFormSchema.validate(state, { abortEarly: false })
			await mutateAsync(state);
			toggleModal(false);
			console.log("Password change")
		}
		catch (err: unknown) {
			const errors = ErrorHandler(err) as Record<string, string>
			if (errors?._validationError) {
				setErrors(errors as PasswordChangeFormErrorStatType)
			}
			console.error(err)

		}

	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, [event.target.id]: event.target.value }));
	};

	const handleCancel = () => {
		if (isPending) return;
		toggleModal(false);
	};

	useEffect(() => {

		return () => {
			setState(initialState)
			setErrors({} as PasswordChangeFormErrorStatType)

		}
	}, [isOpen])

	return (
		<ModalComponent
			id={CHANGE_PASSWORD_MODAL}
			isOpen={isOpen}
			toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.changePassword}>
				<h5>
					<p className="m-0 w-100">
						<span>Change Password</span> <br />
						{errors?.confirmPassword || errors?.newPassword && <small>{errors?.newPassword}</small>}

					</p>
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

				<div className={`d-flex justify-content-end align-items-center mt-4 mb-2 ${style.buttonGroup}`}>
					<ButtonGroup
						className='button cancel me-3'
						handleSubmit={handleCancel}
						disabled={isPending}
						submitText="cancel"
					/>


					<ButtonGroup
						className='button submit'
						handleSubmit={handleModalSubmit}
						disabled={isPending}
						submitText={isPending ? "..." : "OK"}
					/>

				</div>
			</form>
		</ModalComponent>
	);
};

export default ChangePasswordModal;
