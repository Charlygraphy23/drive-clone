import React from "react";
import style from "../style.module.scss";

const ProfileForm = () => {
	return (
		<div className={style.profileForm}>
			<header>hello from header</header>
			<footer className='d-flex justify-content-end align-items-center mt-4 mb-2'>
				<button type='button' className='button cancel me-3'>
					cancel
				</button>
				<button type='submit' className='button submit'>
					OK
				</button>
			</footer>
		</div>
	);
};

export default ProfileForm;
