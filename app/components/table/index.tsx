"use client";

import React from "react";
import style from "./style.module.scss";
import TableHeader from "./components/tableHeader";
import TableBody from "./components/tableBody";
import { ColumnType } from "./interfaces/index.interface";

type Props<T> = {
	columns: ColumnType[];
	data: T[];
};

const MyTable = <T,>({ columns, data }: Props<T>) => {
	return (
		<table cellSpacing={10} className={style.table}>
			<TableHeader columns={columns} />
			<TableBody columns={columns} data={data} />
		</table>
	);
};

export default MyTable;
