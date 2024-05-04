import { Suspense } from "react";
import HeaderComponent from "../header";
import FileAndFolderLoader from "../loader/fileAndFolderLoader";
import FilesAndFolders from "./components/filesAndFolders";
import HeroComponent from "./components/hero";

type Props = {
	folderId?: string
}


const BodyComponent = ({ folderId }: Props) => {
	return (
		<>
			<HeaderComponent />
			<HeroComponent />
			<Suspense fallback={<FileAndFolderLoader />}>
				<FilesAndFolders folderId={folderId} />
			</Suspense>
		</>
	);
};

export default BodyComponent;
