import React, { PropsWithChildren } from "react";
import style from "./style.module.scss";
import Sidebar from "./components/sidebar";

const RouteTemplate = ({ children }: PropsWithChildren) => {
	return (
		<main className={`${style.appLayout} container-fluid`}>
			<div className={`${style.wrapper} d-flex`}>
				<div className={style.sidebar__wrapper}>
					<Sidebar />
				</div>

				<div className={style.body__wrapper}>
					<div className={style?.body}>{children}</div>
				</div>
			</div>
		</main>
	);
};

export default RouteTemplate;
