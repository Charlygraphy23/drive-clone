import { Suspense } from "react";
import HeaderComponent from "../header";
import ResourceLoader from "../loader/resourceLoader";
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
			<Suspense fallback={<ResourceLoader />}>
				<Resources folderId={folderId} />
			</Suspense>
		</>
	);
};

export default BodyComponent;
