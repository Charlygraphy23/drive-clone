import ResourceInfo from "@/app/components/body/components/info";
import Hamburger from "@/app/components/hamburger";
import HeaderComponent from "@/app/components/header";
import ResourceLoader from "@/app/components/loader/resourceLoader";
import { Suspense } from "react";
import SharedPageComponent from "./components/sharedPageComponent";
import style from "./style.module.scss";

const page = async () => {
	return (
		<main className="fullwidth">
			<section className={style.shared}>
				<header className='d-flex justify-content-between align-items-center'>
					<Hamburger />
					<h1>Shared with me</h1>
					<div className="d-flex align-items-center">
						<ResourceInfo style={{ marginRight: "10px" }} />
						<HeaderComponent hideSearch={true} />
					</div>
				</header>

				<Suspense fallback={<ResourceLoader />}>
					<SharedPageComponent />
				</Suspense>
			</section>
		</main>
	);
};

export default page;
