"use client";

import ResourceInfo from "../info";
import NewButtonComponent from "./components/newbutton";
import style from "./style.module.scss";

const HeroComponent = () => {

	return (
		<section className={style.hero}>
			<h1>My Cloud</h1>

			<div className={style.buttonGroup}>
				<NewButtonComponent />
				<ResourceInfo />
			</div>
		</section>
	);
};

export default HeroComponent;
