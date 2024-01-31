"use client";

import React from "react";
import { ColumnType } from "../interfaces/index.interface";
import { isInCenter } from "../utils/index.utils";

type Props = {
	columns: ColumnType[];
};

const TableEmpty = ({ columns }: Props) => {
	return (
		<tr>
			{columns?.map((column, index) => {
				if (isInCenter(index, columns.length))
					return <td key={index}>No Item Found</td>;

				return <td key={index}></td>;
			})}
		</tr>
	);
};

export default TableEmpty;
