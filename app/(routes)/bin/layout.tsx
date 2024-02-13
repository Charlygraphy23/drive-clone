import RouteTemplate from "@/app/routeTemplate";
import React, { PropsWithChildren } from "react";

const BinLayout = ({ children }: PropsWithChildren) => {
	return <RouteTemplate>{children}</RouteTemplate>;
};

export default BinLayout;
