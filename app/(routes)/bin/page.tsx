import ResourceInfo from "@/app/components/body/components/info";
import Hamburger from "@/app/components/hamburger";
import HeaderComponent from "@/app/components/header";
import FileLoader from "@/app/components/loader/fileLoader";
import { Suspense } from "react";
import BinPage from "./components/binPage";
import style from "./style.module.scss";

const page = async () => {
	return (
		<main className="fullwidth">
			<section className={style.bin}>
				<header className='d-flex justify-content-between align-items-center'>

					<div className="d-flex align-items-center">
						<Hamburger />
						<h1 className="m-0 ms-2">Bin</h1>
					</div>
					<div className="d-flex align-items-center">
						<ResourceInfo style={{ marginRight: "10px" }} />
						<HeaderComponent hideSearch={true} />
					</div>
				</header>

				<Suspense fallback={<FileLoader />}>
					<BinPage />
				</Suspense>
			</section>
		</main>
	);
};

export default page;
