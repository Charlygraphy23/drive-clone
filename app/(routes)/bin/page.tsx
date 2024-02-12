import React, { Suspense } from "react";
import style from "./style.module.scss";
import HeaderComponent from "@/app/components/header";
import BinPage from "./components/binPage";
import FileLoader from "@/app/components/loader/fileLoader";

const page = async () => {
	return (
		<section className={style.bin}>
			<header className='d-flex justify-content-between align-items-center'>
				<h1>Bin</h1>
				<HeaderComponent hideSearch={true} />
			</header>

			<Suspense fallback={<FileLoader />}>
				<BinPage />
			</Suspense>
		</section>
	);
};

export default page;
