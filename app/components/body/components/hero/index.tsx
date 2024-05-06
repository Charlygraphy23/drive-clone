"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleInfo } from "@/app/store/actions/info.actions";
import NewButtonComponent from "./components/newbutton";
import style from "./style.module.scss";

const HeroComponent = () => {
	const { show } = useAppSelector(state => state.resourceInfo)
	const dispatch = useAppDispatch()


	const toggleResourceInfo = () => {
		dispatch(toggleInfo())
	}

	return (
		<section className={style.hero}>
			<h1>My Cloud</h1>

			<div className={style.buttonGroup}>
				<NewButtonComponent />
				<div className={`${style.resourceInfo} ${show ? style.active : ""}`} onClick={toggleResourceInfo}>
					<i className="bi bi-info-circle"></i>
				</div>
			</div>
		</section>
	);
};

export default HeroComponent;
