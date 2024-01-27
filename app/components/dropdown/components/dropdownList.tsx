import React, { PropsWithChildren, MouseEventHandler } from "react";
import style from "../style.module.scss";

type Props = {
	className?: string;
	divider?: boolean;
	onClick?: MouseEventHandler<HTMLElement>;
} & PropsWithChildren;

const DropdownList = ({
	className = "",
	children,
	divider = false,
	onClick,
}: Props) => {
	return (
		<li
			className={`${className} ${style.list} dropdown-${
				divider ? "divider" : "item"
			}`}
			onClick={onClick}>
			{children}
		</li>
	);
};

export default DropdownList;
