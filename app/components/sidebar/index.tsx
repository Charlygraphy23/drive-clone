"use client"

import useDeviceWidth from "@/app/hooks/useWidth";
import SidebarBrand from "./components/brand";
import SidebarNavigation from "./components/navigations";
import style from "./style.module.scss";

const Sidebar = () => {

	const { isTablet } = useDeviceWidth()

	return (
		<>
			{!isTablet && <section className={style.sidebar}>
				<SidebarBrand />
				<SidebarNavigation />
			</section>}


			{isTablet && <aside className={`${style.tablet} ${style.active}`}>
				<section className={`${style.sidebar}`}>
					<SidebarBrand />
					<SidebarNavigation />
				</section>
				<div className={style.backdrop}></div>
			</aside>}
		</>

	);
};

export default Sidebar;
