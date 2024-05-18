import ResourceInfo from "@/app/components/body/components/info";
import HeaderComponent from "@/app/components/header";
import FileLoader from "@/app/components/loader/fileLoader";
import { Suspense } from "react";
import BinPage from "./components/binPage";
import style from "./style.module.scss";

const page = async () => {
	return (
		<section className={style.bin}>
			<header className='d-flex justify-content-between align-items-center'>
				<h1>Bin</h1>
				<div className="d-flex align-items-center">
					<ResourceInfo style={{ marginRight: "10px" }} />
					<HeaderComponent hideSearch={true} />
				</div>
			</header>

			<Suspense fallback={<FileLoader />}>
				<BinPage />
			</Suspense>
		</section>
	);
};

export default page;
