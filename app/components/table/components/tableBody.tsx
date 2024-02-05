"use client";

import React from "react";
import TableColumnHandler from "./tableColumnHandler";
import TableEmpty from "./tableEmpty";
import { ColumnType } from "../interfaces/index.interface";

type Props<T> = {
	columns: ColumnType[];
	data: T[];
	emptyIcon?: React.ReactElement;
};

const TableBody = <T,>({ columns, data, emptyIcon }: Props<T>) => {
	return (
		<tbody>
			{data?.map((val, key) => (
				<tr key={key}>
					{columns?.map((column, i) => {
						if (i === 0)
							return (
								<th key={i}>
									{<TableColumnHandler<T> data={val} {...column} />}
								</th>
							);
						return (
							<td key={i}>
								{<TableColumnHandler<T> data={val} {...column} />}
							</td>
						);
					})}
				</tr>
			))}

			{/* {loading &&
				Array(4)
					.fill(0)
					.map((_, index) => <TableLoader key={index} columns={columns} />)} */}

			{!data?.length && <TableEmpty columns={columns} emptyIcon={emptyIcon} />}
		</tbody>
	);
};

export default TableBody;
