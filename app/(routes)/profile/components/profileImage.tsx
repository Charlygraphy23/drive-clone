"use client"

import { updateImageApi } from "@/app/_apis_routes/user";
import { DEFAULT_IMAGE } from "@/app/_config";
import LocalImage from "@/app/components/LocalImage";
import useToast from "@/app/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import style from "../style.module.scss";

const ProfileImageComponent = () => {
	const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE)
	const { data, update } = useSession();
	const user = data?.user

	const mutation = useMutation({ mutationFn: updateImageApi })
	const Toast = useToast()

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const files = e.target.files;
			const file = files?.[0];


			if (!file) return;
			const formData = new FormData();
			formData.append("image", file)



			const node = document.getElementById("profile-image") as HTMLInputElement
			node.value = ""

			const url = URL.createObjectURL(file)
			setImageUrl(url)

			await mutation.mutateAsync(formData)
			update({
				user: {
					...data?.user,
					imageUrl: `/api/users/image/${data?.user?._id}?time=${Date.now()}`
				}
			})
		}
		catch (err: any) {
			console.error("Error while getting file ", err)
			const error = err as AxiosError<{ message: string }>
			const message = error?.response?.data?.message || error?.message
			Toast.error(message)
		}

	}

	const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
		if (mutation.isPending) {
			e.preventDefault();
			e.stopPropagation()
		}
	}

	useEffect(() => {
		if (!user?.imageUrl) return;
		setImageUrl(user?.imageUrl ?? "")
	}, [user?.imageUrl])

	return (
		<div className={style.profileImage}>
			<LocalImage
				className={style.image}
				src={imageUrl ?? ""}
				alt='profile'
				fill
				sizes="(max-width: 50px) 50vw"
				placeholder='blur'
				loading='lazy'
				blurDataURL={DEFAULT_IMAGE}
			/>

			<label htmlFor="profile-image" onClick={handleClick}>
				<input
					id="profile-image"
					type="file"
					accept="image/*"
					hidden
					onChange={handleChange}
				/>
				{mutation.isPending ? <div className={`${style.loader} spinner-border`} role="status">
					<span className="visually-hidden">Loading...</span>
				</div> : <i className='bi bi-camera-fill'></i>}
			</label>
		</div>
	);
};

export default ProfileImageComponent;
