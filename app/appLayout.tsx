import React, { PropsWithChildren } from "react";
import Sidebar from "./components/sidebar";
import style from "./style.module.scss";
import AppClientProvider from "./provider";

const AppLayout = ({ children }: PropsWithChildren) => {
	return (
		<AppClientProvider>
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
		</AppClientProvider>
	);
};

export default AppLayout;
