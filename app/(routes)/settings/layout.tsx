import RouteTemplate from "@/app/routeTemplate";
import React, { PropsWithChildren } from "react";

const SettingsLayout = ({ children }: PropsWithChildren) => {
	return <RouteTemplate>{children}</RouteTemplate>;
};

export default SettingsLayout;
