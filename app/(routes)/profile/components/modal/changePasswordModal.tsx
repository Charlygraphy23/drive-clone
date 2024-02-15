"use client";

import ModalComponent from '@/app/components/modal/components/modalComponent';
import { CHANGE_PASSWORD_MODAL } from '@/app/config/const';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {
	toggleModal as toggleModalState,
} from "@/app/store/actions";


type Props = {
	isOpen: boolean;
};

const ChangePasswordModal = ({isOpen} : Props) => {
    const [state, setState] = useState({
        newPassword: '',
        confirmPassword: ""
    })

    const dispatch = useDispatch();
    const toggleModal = (isOpen?: boolean) => {
		dispatch(
			toggleModalState({
				isOpen: !!isOpen,
				name: "renameModal",
			})
		);

		const value = data?.value ?? "";

		setName(value as string);
	};

  return (
    <ModalComponent id={CHANGE_PASSWORD_MODAL} isOpen={isOpen} toggle={toggleModal}>
			<form onSubmit={handleModalSubmit} className={style.renameModal}>
				<h5>
					<span>Change Password</span>
					<ModalComponent.ButtonClose />
				</h5>

				<input type='text' value={name} onChange={onChange} />
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
  )
}

export default ChangePasswordModal