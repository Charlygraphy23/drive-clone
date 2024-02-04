import React, { Suspense } from "react";
import TopBarComponent from "./components/toolbar";
import HeroComponent from "./components/hero";
import FilesAndFolders from "./components/filesAndFolders";
import FileAndFolderLoader from "../loader/fileAndFolderLoader";

const BodyComponent = () => {
	return (
		<>
			<TopBarComponent />
			<HeroComponent />
			<Suspense fallback={<FileAndFolderLoader />}>
				<FilesAndFolders />
			</Suspense>
		</>
	);
};

export default BodyComponent;
