import React, { PropsWithChildren } from "react";
import DropdownList from "./dropdownList";
import style from "../style.module.scss";

type Props = {
	className?: string;
	children?:
		| React.ReactElement<typeof DropdownList>[]
		| React.ReactElement<typeof DropdownList>;
} & PropsWithChildren;

const DropdownMenu = ({ className = "", children }: Props) => {
	return (
		<ul className={`${className} ${style.menu} dropdown-menu`}>{children}</ul>
	);
};

export default DropdownMenu;
