import React, { Suspense } from "react";
import style from "./style.module.scss";
import HeaderComponent from "@/app/components/header";
import StorageComponent from "./components/storage";
import { StorageLoader } from "./components/loader";

const SettingsPage = () => {
	return (
		<section className={style.settings}>
			<header className='d-flex justify-content-between align-items-center'>
				<h1>Settings</h1>
				<HeaderComponent hideSearch={true} />
			</header>

			<div className={style.settingComponent}>
				<div className={style.wrapper}>
					<h5>Storage</h5>
					<Suspense fallback={<StorageLoader />}>
						<StorageComponent />
					</Suspense>

					<button className={`button`}> Buy storage</button>
				</div>
			</div>
		</section>
	);
};

export default SettingsPage;
