import React, { Suspense } from "react";
import TopBarComponent from "./components/toolbar";
import style from "./style.module.scss";
import HeroComponent from "./components/hero";
import FilesAndFolders from "./components/filesAndFolders";

const BodyComponent = () => {
	return (
		<div className={style.body}>
			<TopBarComponent />
			<HeroComponent />
			<Suspense fallback={<div> Loading...</div>}>
				<FilesAndFolders />
			</Suspense>
		</div>
	);
};

export default BodyComponent;
