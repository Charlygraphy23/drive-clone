import BodyComponent from "./components/body";
import RouteTemplate from "./routeTemplate";


type Props = {
	folderId?: string
}

export default function Home({ folderId }: Props) {

	return (
		<main className="fullwidth">
			<RouteTemplate>
				<BodyComponent folderId={folderId} />
			</RouteTemplate>
		</main>
	);
}
