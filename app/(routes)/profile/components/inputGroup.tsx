"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { changeProfileData } from "@/app/store/actions";
import { ProfileStateType } from "@/app/store/reducers/profile.reduce";
import { ChangeEvent } from "react";
import style from "../style.module.scss";

type Props = {
	label: string;
	dataIndex: keyof ProfileStateType["data"];
	isEditable: boolean;
	hasError?: string
};

const ProfileInputGroup = ({ label, dataIndex, isEditable, hasError }: Props) => {
	const { data } = useAppSelector(
		(state) => state.profile
	);
	const dispatch = useAppDispatch()
	const value = data?.[dataIndex]

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		dispatch(changeProfileData({
			[dataIndex]: val
		}));
	};

	return (
		<div className={`${style.inputGroup} ${hasError ? style.error : ""}`}>
			{isEditable && (
				<div className={style.wrapper}>
					{hasError && <span>{hasError}</span>}
					<input id={label} type='text' value={value} onChange={onChange} />
				</div>
			)}
			{!isEditable && <p>{value ?? "-"}</p>}
			<label htmlFor=''>{label}</label>
		</div>
	);
};

export default ProfileInputGroup;
