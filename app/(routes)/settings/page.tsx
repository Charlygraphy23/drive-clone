
import HeaderComponent from "@/app/components/header";
import StorageComponent from "./components/storage";
import style from "./style.module.scss";

const SettingsPage = () => {

	return (
		<main className="fullwidth">
			<section className={style.settings}>
				<header className='d-flex justify-content-between align-items-center'>
					<h1>Settings</h1>
					<HeaderComponent hideSearch={true} />
				</header>

				<div className={style.settingComponent}>
					<div className={style.wrapper}>
						<h5>Storage</h5>
						<StorageComponent />
					</div>
				</div>
			</section>
		</main>
	);
};

export default SettingsPage;
