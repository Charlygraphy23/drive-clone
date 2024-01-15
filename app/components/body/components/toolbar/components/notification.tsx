import React from "react";
import style from "../../../style.module.scss";

const TopbarNotification = () => {
	return (
		<div className={style.notification__wrapper}>
			<i className='bi bi-bell-fill'></i>
		</div>
	);
};

export default TopbarNotification;
