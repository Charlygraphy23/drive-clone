import React from "react";
import style from "./style.module.scss";
import SidebarBrand from "./components/brand";
import SidebarNavigation from "./components/navigations";

const Sidebar = () => {
	return (
		<section className={style.sidebar}>
			<SidebarBrand />
			<SidebarNavigation />
		</section>
	);
};

export default Sidebar;
