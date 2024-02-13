import React from "react";
import style from "../style.module.scss";
import Image from "next/image";

const ProfileImageComponent = () => {
	return (
		<div className={style.profileImage}>
			<Image
				className={style.image}
				src={
					"https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				}
				alt='profile'
				fill
			/>

			<button>
				<i className='bi bi-camera-fill'></i>
			</button>
		</div>
	);
};

export default ProfileImageComponent;
