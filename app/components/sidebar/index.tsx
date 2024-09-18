"use client"

import useDeviceWidth from "@/app/hooks/useWidth";
import { useEffect, useRef, useState } from "react";
import SidebarBrand from "./components/brand";
import SidebarNavigation from "./components/navigations";
import style from "./style.module.scss";

const Sidebar = () => {
	const ref = useRef<HTMLElement>(null);
	const { isTablet } = useDeviceWidth()
	const [state, setState] = useState(true)


	useEffect(() => {
		function checkClick(e: MouseEvent) {
			const target = e.target as Node
			if ((ref.current && !ref.current?.contains(target))) {
				console.log("Clicked Outside")
				setState(false)
			}
		}

		document.addEventListener("click", checkClick)
		return () => {
			document.removeEventListener("click", checkClick)
		}
	}, [])

	return (
		<>
			{!isTablet && <section className={style.sidebar}>
				<SidebarBrand />
				<SidebarNavigation />
			</section>}


			{isTablet && <>
				<aside className={`${style.tablet} ${state && style.active}`}>
					<section ref={ref} className={`${style.sidebar}`}>
						<SidebarBrand />
						<SidebarNavigation />
					</section>
				</aside>
				<div className={style.backdrop}></div>
			</>}



		</>

	);
};

export default Sidebar;
