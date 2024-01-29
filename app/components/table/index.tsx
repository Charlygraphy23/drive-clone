"use client";

import React from "react";
import style from "./style.module.scss";
import TableHeader from "./components/tableHeader";
import TableBody from "./components/tableBody";

type Props = {
	columns: any[];
};

const MyTable = ({ columns }: Props) => {
	return (
		<table cellSpacing={10} className={style.table}>
			<TableHeader columns={columns} />
			<TableBody columns={columns} />
		</table>
	);
};

export default MyTable;
