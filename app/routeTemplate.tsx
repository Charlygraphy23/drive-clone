import { PropsWithChildren } from "react";
import ResourceDetails from "./components/resourceDetails";
import Sidebar from "./components/sidebar";
import style from "./style.module.scss";

const RouteTemplate = ({ children }: PropsWithChildren) => {
	return (
		<main className={`${style.appLayout} container-fluid fullwidth`}>
			<div className={`${style.wrapper} d-flex`}>
				<div className={style.sidebar__wrapper}>
					<Sidebar />
				</div>

				<div className={style.body__wrapper}>
					<div className={style?.body}>{children}</div>
					<aside className={style?.info}>
						<ResourceDetails />
					</aside>
				</div>


			</div>
		</main>
	);
};

export default RouteTemplate;
