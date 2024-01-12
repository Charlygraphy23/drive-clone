import React from "react";
import style from "../../style.module.scss";

const SidebarBrand = () => {
	return (
		<div className={style.sidebar__brand}>
			<div className={style.brand__logo}>
				<i className='bi bi-cloud'></i>
			</div>

			<p className={style.brand__name}>MyCloud</p>
		</div>
	);
};

export default SidebarBrand;
