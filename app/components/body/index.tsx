import React, { Suspense } from "react";
import HeaderComponent from "../header";
import HeroComponent from "./components/hero";
import FileAndFolderLoader from "../loader/fileAndFolderLoader";
import FilesAndFolders from "./components/filesAndFolders";

const BodyComponent = () => {
	return (
		<>
			<HeaderComponent />
			<HeroComponent />
			<Suspense fallback={<FileAndFolderLoader />}>
				<FilesAndFolders />
			</Suspense>
		</>
	);
};

export default BodyComponent;
