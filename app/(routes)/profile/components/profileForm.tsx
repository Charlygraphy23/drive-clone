"use client";

import { updateProfileApi } from "@/app/_apis_routes/user";
import { SignupSchemaValidator } from "@/app/api/_validation/user.validation";
import ButtonGroup from "@/app/components/buttonGroup";
import { RootState } from "@/app/store";
import { ProfileStateType } from "@/app/store/reducers/profile.reduce";
import { ErrorHandler } from "@/app/utils/index.utils";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "../style.module.scss";
import ProfileInputGroup from "./inputGroup";
import ProfilePasswordChange from "./passwordChange";

const ProfileForm = () => {
	const { data } = useSelector<RootState, ProfileStateType>(
		(state) => state.profile
	);
	const [isEditable, setIsEditable] = useState(false)
	const mutation = useMutation({ mutationFn: updateProfileApi })
	const [errors, setErrors] = useState<Record<Partial<keyof ProfileStateType["data"]>, string>>({
		email: "",
		firstName: "",
		lastName: "",
	})
	const { update, data: sessionData } = useSession()

	const handleEdit = () => {
		setIsEditable(true);
	};

	const handleCancel = () => {
		setIsEditable(false)
	};

	const handleSubmit = async () => {

		if (mutation?.isPending) return;

		try {
			setErrors({} as Record<Partial<keyof ProfileStateType["data"]>, string>)
			await SignupSchemaValidator.validate({
				firstName: data?.firstName,
				lastName: data?.lastName,
				email: data?.email
			}, { abortEarly: false })

			await mutation.mutateAsync(data)
			update({
				name: `${data?.firstName} ${data?.lastName}`,
				email: data?.email,
				user: {
					...sessionData?.user,
					...data
				}
			})

			setIsEditable(false)
		}
		catch (error) {
			const err = ErrorHandler(error) as Record<string, string>
			if (err?._validationError) {
				setErrors(err)
			}
			console.log(err)
		}
	};

	return (
		<div className={style.profileForm}>
			{isEditable && (
				<section
					className={`d-flex justify-content-end align-items-center mb-3 ${style.buttonGroup}`}>
					<ButtonGroup submitText="cancel" className='button cancel me-4' handleSubmit={handleCancel} />

					<ButtonGroup disabled={mutation?.isPending} submitText={mutation?.isPending ? "..." : "OK"} className="button" handleSubmit={handleSubmit} />
				</section>
			)}

			<section className={style.body}>
				{!isEditable && (
					<div
						className={`d-flex justify-content-end align-items-center w-100 ${style.editButton}`}>
						<i className='bi bi-pencil-fill' onClick={handleEdit}></i>
					</div>
				)}
				<ProfileInputGroup label='First Name' dataIndex='firstName' isEditable={isEditable} hasError={errors?.firstName} />
				<ProfileInputGroup label='Last Name' dataIndex='lastName' isEditable={isEditable} hasError={errors?.lastName} />
				<ProfileInputGroup label='Email' dataIndex='email' isEditable={isEditable} hasError={errors?.email} />
				{/* <ProfileInputGroup label='@Username' dataIndex='username' isEditable={isEditable} /> */}
			</section>

			<section className={style.body}>
				<ProfilePasswordChange value='' />
			</section>
		</div>
	);
};

export default ProfileForm;
