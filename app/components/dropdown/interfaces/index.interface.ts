import React from "react";

export type HandlerType = {
	render?: () => React.ReactElement;
	className?: string;
};
