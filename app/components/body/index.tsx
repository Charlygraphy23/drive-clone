import { Suspense } from "react";
import HeaderComponent from "../header";
import FileAndFolderLoader from "../loader/fileAndFolderLoader";
import HeroComponent from "./components/hero";
import Resources from "./components/resources";

type Props = {
	folderId?: string
}


const BodyComponent = ({ folderId }: Props) => {
	return (
		<>
			<HeaderComponent />
			<HeroComponent />
			<Suspense fallback={<FileAndFolderLoader />}>
				<Resources folderId={folderId} />
			</Suspense>
		</>
	);
};

export default BodyComponent;
