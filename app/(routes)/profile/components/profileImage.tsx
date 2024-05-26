"use client"

import { updateImageApi } from "@/app/_apis_routes/user";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, MouseEvent } from "react";
import style from "../style.module.scss";

const ProfileImageComponent = () => {
	const { data } = useSession();
	const user = data?.user

	const mutation = useMutation({ mutationFn: updateImageApi })

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const files = e.target.files;
			const file = files?.[0];

			if (!file) return;
			const formData = new FormData();
			formData.set("image", file)

			mutation.mutate(formData)

			const node = document.getElementById("profile-image") as HTMLInputElement
			node.value = ""
		}
		catch (err) {
			console.error("Error while getting file ", err)
		}

	}

	const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
		if (mutation.isPending) {
			e.preventDefault();
			e.stopPropagation()
		}
	}

	return (
		<div className={style.profileImage}>
			<Image
				className={style.image}
				src={user?.imageUrl ?? ""}
				alt='profile'
				fill
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
