"use client"

import useDeviceWidth from "@/app/hooks/useWidth";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleSidebar } from "@/app/store/actions/config.action";
import { useEffect, useRef } from "react";
import SidebarBrand from "./components/brand";
import SidebarNavigation from "./components/navigations";
import style from "./style.module.scss";

const Sidebar = () => {
	const ref = useRef<HTMLElement>(null);
	const { isTablet } = useDeviceWidth()
	const { app: { showSideBar } } = useAppSelector(state => state?.config)
	const dispatch = useAppDispatch()

	useEffect(() => {
		function checkClick(e: MouseEvent) {
			const target = e.target as Node
			const toggleButton = document.getElementById("sidebar-toggle")

			if (toggleButton?.contains(target)) return;

			if ((ref.current && !ref.current?.contains(target) && showSideBar)) {
				dispatch(toggleSidebar({ showSidebar: false }))
			}
		}

		document.addEventListener("click", checkClick)
		return () => {
			document.removeEventListener("click", checkClick)
		}
	}, [dispatch, showSideBar])

	return (
		<>
			{!isTablet && <section className={style.sidebar}>
				<SidebarBrand />
				<SidebarNavigation />
			</section>}


			{isTablet && <>
				<aside className={`${style.tablet} ${showSideBar && style.active}`}>
					<section ref={ref} className={`${style.sidebar}`}>
						<SidebarBrand />
						<SidebarNavigation />
					</section>
				</aside>
				<div className="backdrop"></div>
			</>}



		</>

	);
};

export default Sidebar;
