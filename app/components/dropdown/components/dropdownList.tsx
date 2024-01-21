import React, { PropsWithChildren, MouseEventHandler } from "react";

type Props = {
	className?: string;
	divider?: boolean;
	onClick?: MouseEventHandler<HTMLElement>;
} & PropsWithChildren;

const DropdownList = ({ className, children, divider, onClick }: Props) => {
	return (
		<li
			className={`${className} dropdown-${divider ? "divider" : "item"}`}
			onClick={onClick}>
			{children}
		</li>
	);
};

export default DropdownList;
