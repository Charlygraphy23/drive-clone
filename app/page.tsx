import Sidebar from "@app/components/sidebar";
import style from "./style.module.scss";
import BodyComponent from "./components/body";

export default function Home() {
	return (
		<main className={`${style.home} container-fluid`}>
			<div className={`${style.home__wrapper} d-flex`}>
				<div className={style.sidebar__wrapper}>
					<Sidebar />
				</div>

				<div className={style.body__wrapper}>
					<BodyComponent />
				</div>
			</div>
		</main>
	);
}
