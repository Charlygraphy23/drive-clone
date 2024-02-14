import React, { PropsWithChildren } from "react";
import style from "./style.module.scss";
import HeaderComponent from "@/app/components/header";
import RouteTemplate from "@/app/routeTemplate";
import ProfileBackButton from "./components/backButton";

const ProfileLayout = ({children} : PropsWithChildren) => {
	return (
		<RouteTemplate>
			<div className={style.layout}>
				<header className='d-flex justify-content-between align-items-center mb-5'>
					<ProfileBackButton/>
					<HeaderComponent hideSearch={true} />
				</header>

				<>
					{children}
				</>
			</div>
		</RouteTemplate>
	);
};

export default ProfileLayout;
