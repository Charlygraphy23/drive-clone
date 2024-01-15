import React from "react";
import style from "./style.module.scss";
import NewButtonComponent from "./components/newbutton";

const HeroComponent = () => {
	return (
		<section className={style.hero}>
			<h1>My Cloud</h1>

			<NewButtonComponent />
		</section>
	);
};

export default HeroComponent;
