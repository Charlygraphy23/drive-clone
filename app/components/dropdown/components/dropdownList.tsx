import React, { PropsWithChildren } from "react";

type Props = { className?: string; divider?: boolean } & PropsWithChildren;

const DropdownList = ({ className, children, divider }: Props) => {
  return (
    <li className={`${className} dropdown-${divider ?  "divider" : "item"}`}>
      {children}
    </li>
  );
};
	
export default DropdownList;
