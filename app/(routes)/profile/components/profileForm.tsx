"use client";

import React, { useContext } from "react";
import style from "../style.module.scss";
import ProfileInputGroup from "./inputGroup";
import ProfilePasswordChange from "./passwordChange";
import { ProfileStateContext } from "../store/context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ProfileStateType } from "@/app/store/reducers/profile.reduce";
import { addProfileData } from "@/app/store/actions";

const ProfileForm = () => {
	const { state, dispatch } = useContext(ProfileStateContext);
	const { data } = useSelector<RootState, ProfileStateType>(
		(state) => state.profile
	);
	const storeDispatch = useDispatch();

	const handleEdit = () => {
		dispatch((prev) => ({
			...prev,
			isEditProfile: true,
		}));
	};

	const handleCancel = () => {
		dispatch((prev) => ({
			...prev,
			isEditProfile: false,
			data: data,
		}));
	};

	const handleSubmit = () => {
		dispatch((prev) => ({
			...prev,
			isEditProfile: false,
		}));

		storeDispatch(addProfileData(state.data));
	};

	return (
		<div className={style.profileForm}>
			{state.isEditProfile && (
				<section
					className={`d-flex justify-content-end align-items-center mb-3 ${style.buttonGroup}`}>
					<button
						type='button'
						className='button cancel me-3'
						onClick={handleCancel}>
						cancel
					</button>
					<button type='submit' className='button' onClick={handleSubmit}>
						OK
					</button>
				</section>
			)}

			<section className={style.body}>
				{!state.isEditProfile && (
					<div
						className={`d-flex justify-content-end align-items-center w-100 ${style.editButton}`}>
						<i className='bi bi-pencil-fill' onClick={handleEdit}></i>
					</div>
				)}
				<ProfileInputGroup label='First Name' dataIndex='firstName' />
				<ProfileInputGroup label='Last Name' dataIndex='lastName' />
				<ProfileInputGroup label='Email' dataIndex='email' />
				<ProfileInputGroup label='@Username' dataIndex='username' />
			</section>

			<section className={style.body}>
				<ProfilePasswordChange value='' />
			</section>
		</div>
	);
};

export default ProfileForm;
