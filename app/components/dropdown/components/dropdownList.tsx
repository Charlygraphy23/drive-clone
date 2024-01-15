import React, { PropsWithChildren } from "react";

type Props = { className?: string } & PropsWithChildren;

const DropdownList = ({ className, children }: Props) => {
	return <li className={className}>{children}</li>;
};

export default DropdownList;
