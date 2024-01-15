import React, { PropsWithChildren } from "react";
import DropdownMenu from "./components/dropdownMenu";
import DropdownList from "./components/dropdownList";

type HandlerType = {
	render?: () => React.ReactElement;
	className?: string;
};

type Props = {
	className?: string;
	handler?: HandlerType;
	children: React.ReactElement<typeof DropdownMenu>;
} & PropsWithChildren;

const MyDropdown = ({ className, children, handler }: Props) => {
	return (
		<div className={`${className} dropdown`}>
			<div
				className={`dropdown-toggle ${handler?.className}`}
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
