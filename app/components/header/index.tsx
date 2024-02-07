import React from "react";
import style from "./style.module.scss";
import TopBarAvatar from "./components/avatar";
import TopbarNotification from "./components/notification";

type Props = {
	hideSearch?: boolean;
};

const Header = ({ hideSearch }: Props) => {
	return (
		<header className={style.header}>
			{!hideSearch && (
				<div className={style.search}>
					<i className='bi bi-search'></i>
					<p>Search File..</p>
				</div>
			)}
			<div className='d-flex align-items-center'>
				<TopbarNotification />
				<TopBarAvatar />
			</div>
		</header>
	);
};

export default Header;
