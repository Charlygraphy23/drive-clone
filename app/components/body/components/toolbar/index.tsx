import React from "react";
import style from "../../style.module.scss";
import TopBarAvatar from "./components/avatar";
import TopbarNotification from "./components/notification";

const TopBarComponent = () => {
	return (
		<div className={style.body__topbar}>
			<div className={style.topbar__search}>
				<i className='bi bi-search'></i>
				<p>Search File..</p>
			</div>
			<div className='d-flex align-items-center'>
				<TopbarNotification />
				<TopBarAvatar />
			</div>
		</div>
	);
};

export default TopBarComponent;
