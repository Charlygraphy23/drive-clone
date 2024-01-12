import Sidebar from "@app/components/sidebar";
import style from "./style.module.scss";

export default function Home() {
	return (
		<main className={`${style.home} container-fluid`}>
			<div className={`${style.sidebar__wrapper} row`}>
				<div className='col-4 col-md-3'>
					<Sidebar />
				</div>

				<div className='col-6 col-md-9'>this is sidebar</div>
			</div>
		</main>
	);
}
