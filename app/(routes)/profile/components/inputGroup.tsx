"use client";

import React, { ChangeEvent, useContext } from "react";
import style from "../style.module.scss";
import { ProfileStateContext } from "../store/context";
import { ProfileContextStateType } from "../store/provider";

type Props = {
	label: string;
	dataIndex: keyof ProfileContextStateType["data"];
};

const ProfileInputGroup = ({ label, dataIndex }: Props) => {
	const { state, dispatch } = useContext(ProfileStateContext);
	const value = state?.data?.[dataIndex];

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		dispatch((prev) => ({
			...prev,
			data: {
				...prev.data,
				[dataIndex]: val,
			},
		}));
	};

	return (
		<div className={style.inputGroup}>
			{state.isEditProfile && (
				<input id={label} type='text' value={value} onChange={onChange} />
			)}
			{!state.isEditProfile && <p>{value ?? "-"}</p>}
			<label htmlFor=''>{label}</label>
		</div>
	);
};

export default ProfileInputGroup;
