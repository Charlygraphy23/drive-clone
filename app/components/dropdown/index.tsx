import React, { PropsWithChildren } from "react";
import DropdownMenu from "./components/dropdownMenu";
import DropdownList from "./components/dropdownList";
import style from "./style.module.scss";

type HandlerType = {
	render?: () => React.ReactElement;
	className?: string;
};

type Props = {
	className?: string;
	handler?: HandlerType;
	children: React.ReactElement<typeof DropdownMenu>;
	showIcon?: boolean;
} & PropsWithChildren;

const MyDropdown = ({ className = "", children, handler, showIcon }: Props) => {
	return (
		<div className={`${className} ${style.dropdown} dropdown`}>
			<div
				className={`dropdown-toggle ${style.toggle} ${
					showIcon ? style?.showIcon : ""
				} ${handler?.className}`}
				data-bs-toggle='dropdown'>
				{handler?.render ? handler?.render() : "Dropdown handler"}
			</div>
			{children}
		</div>
	);
};

MyDropdown.Menu = DropdownMenu;
MyDropdown.List = DropdownList;

export default MyDropdown;
