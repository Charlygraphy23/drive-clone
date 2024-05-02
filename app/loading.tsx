"use client"

import style from "./style.module.scss";

const PageLoader = () => {
	return (
		<section className={style.loadingWrapper}>
			<div className={`${style.loader}`}>
				<svg viewBox='0 0 80 80'>
					<circle id='test' cx='40' cy='40' r='32'></circle>
				</svg>
			</div>

			<div className={`${style.loader} ${style.triangle}`}>
				<svg viewBox='0 0 86 80'>
					<polygon points='43 8 79 72 7 72'></polygon>
				</svg>
			</div>

			<div className={`${style.loader}`}>
				<svg viewBox='0 0 80 80'>
					<rect x='8' y='8' width='64' height='64'></rect>
				</svg>
			</div>
		</section>
	);
};

export default PageLoader;
