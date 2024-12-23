
import Hamburger from "@/app/components/hamburger";
import HeaderComponent from "@/app/components/header";
import StorageComponent from "./components/storage";
import style from "./style.module.scss";

const SettingsPage = () => {

	return (

		<section className={style.settings}>
			<header className='d-flex justify-content-between align-items-center'>
				<div className="d-flex align-items-center">
					<Hamburger />
					<h1 className="m-0 ms-2">Settings</h1>
				</div>
				<HeaderComponent hideSearch={true} />
			</header>

			<div className={style.settingComponent}>
				<div className={style.wrapper}>
					<h5>Storage</h5>
					<StorageComponent />
				</div>
			</div>
		</section>
	);
};

export default SettingsPage;
