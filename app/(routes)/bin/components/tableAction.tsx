"use client";

import MyDropdown from "@/app/components/dropdown";
import React from "react";

type Props = {
	restoreApi: () => Promise<any>;
};

const TableAction = ({ restoreApi }: Props) => {
	return (
		<MyDropdown
			handler={{
				render: () => <i className='bi bi-three-dots'></i>,
			}}>
			<MyDropdown.Menu>
				<MyDropdown.List onClick={() => restoreApi()}>Restore</MyDropdown.List>
				<MyDropdown.List>Delete forever</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default TableAction;
