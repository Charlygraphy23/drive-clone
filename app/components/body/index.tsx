import React from "react";
import TopBarComponent from "./components/toolbar";
import style from "./style.module.scss";
import HeroComponent from "./components/hero";
import FilesAndFolders from "./components/filesAndFolders";

const BodyComponent = () => {
	return (
		<div className={style.body}>
			<TopBarComponent />
			<HeroComponent />
			<FilesAndFolders />
		</div>
	);
};

export default BodyComponent;
