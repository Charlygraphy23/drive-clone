import React from "react";
import style from "./style.module.scss";
import HeaderComponent from "@/app/components/header";
import RouteTemplate from "@/app/routeTemplate";
import ProfileImageComponent from "./components/profileImage";
import ProfileForm from "./components/profileForm";

const ProfileLayout = () => {
	return (
		<RouteTemplate>
			<div className={style.layout}>
				<header className='d-flex justify-content-between align-items-center mb-5'>
					<button>
						<i className='bi bi-chevron-left'></i>
					</button>

					<HeaderComponent hideSearch={true} />
				</header>

				<ProfileImageComponent />
				<ProfileForm />
			</div>
		</RouteTemplate>
	);
};

export default ProfileLayout;
