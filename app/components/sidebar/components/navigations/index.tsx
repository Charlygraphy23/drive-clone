import React from "react";
import style from "./style.module.scss";
import NavRoute from "./components/navRoute";

const SidebarNavigation = () => {
	return (
		<div className={style.sidebar__navigation}>
			<NavRoute
				path='/'
				icon={<i className='bi bi-house-fill'></i>}
				label='Home'
			/>

			<NavRoute
				path='/bin'
				icon={<i className='bi bi-trash-fill'></i>}
				label='Recycle bin'
			/>

			<NavRoute
				path='/settings'
				icon={<i className='bi bi-gear-fill'></i>}
				label='Settings'
			/>
		</div>
	);
};

export default SidebarNavigation;
