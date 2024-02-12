"use client";

import React from "react";
import style from "./style.module.scss";
import TableHeader from "./components/tableHeader";
import TableBody from "./components/tableBody";
import { TableProps } from "./interfaces/index.interface";
import FullTableLoader from "./components/fullTableLoader";

const MyTable = <T,>({
	columns,
	data,
	emptyIcon,
	isLoading,
}: TableProps<T>) => {
	return (
		<section className={style.table}>
			<table cellSpacing={10}>
				<TableHeader columns={columns} />
				<TableBody
					columns={columns}
					data={data}
					emptyIcon={emptyIcon}
					isLoading={isLoading}
				/>
			</table>
			{isLoading && <FullTableLoader />}
		</section>
	);
};

export default MyTable;
