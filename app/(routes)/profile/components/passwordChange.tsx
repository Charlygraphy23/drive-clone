"use client";

import React from "react";
import style from "../style.module.scss";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/app/store/actions";

type Props = {
	value: string;
	dataIndex?: string;
};

const ProfilePasswordChange = ({ value }: Props) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(
			toggleModal({
				isOpen: true,
				name: "changePasswordModal",
			})
		);
	};

	return (
		<div className={style.inputPasswordGroup}>
			<div>
				<p>{value || "------------"}</p>
				<label htmlFor=''>Password</label>
			</div>

			<button className='button' onClick={handleClick}>
				Change
			</button>
		</div>
	);
};

export default ProfilePasswordChange;
