import PageLoader from "@/app/loading";
import RouteTemplate from "@/app/routeTemplate";
import { PropsWithChildren, Suspense } from "react";

const SettingsLayout = ({ children }: PropsWithChildren) => {

	return <Suspense fallback={<PageLoader />}>
		<RouteTemplate>{children}</RouteTemplate>
	</Suspense>;
};

export default SettingsLayout;
