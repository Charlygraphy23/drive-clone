import React from "react";
import style from "./style.module.scss";

const FolderLoader = () => {
	return (
		<section className={style.wrapper}>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<div key={index} className={style.folderLoader}></div>
				))}
		</section>
	);
};

export default FolderLoader;
