import React, { PropsWithChildren } from "react";
import DropdownList from "./dropdownList";

type Props = {
	className?: string;
	children?:
		| React.ReactElement<typeof DropdownList>[]
		| React.ReactElement<typeof DropdownList>;
} & PropsWithChildren;

const DropdownMenu = ({ className, children }: Props) => {
	return <ul className={`${className} dropdown-menu`}>{children}</ul>;
};

export default DropdownMenu;
