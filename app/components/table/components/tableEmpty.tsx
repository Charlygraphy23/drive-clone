"use client";

import React from "react";
import { ColumnType } from "../interface/index.interface";

type Props = {
	columns: ColumnType[];
};

const TableEmpty = ({ columns }: Props) => {
	return (
		<tr>
			{columns?.map((column, index) => {
				if (index === Math.floor(columns.length / 2))
					return <td key={index}>No Item Found</td>;

				return <td key={index}></td>;
			})}
		</tr>
	);
};

export default TableEmpty;
