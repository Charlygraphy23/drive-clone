"use client"

import style from "./style.module.scss";

const FileLoader = () => {
	return (
		<section className={style.wrapper}>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<div key={index} className={style.row}>
						<div className={style.col}></div>
						<div className={style.col}></div>
						<div className={style.col}></div>
					</div>
				))}
		</section>
	);
};

export default FileLoader;
