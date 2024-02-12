"use client";

import React from "react";
import TableColumnHandler from "./tableColumnHandler";
import TableEmpty from "./tableEmpty";
import { ColumnType, TableProps } from "../interfaces/index.interface";
import TableLoader from "./tableLoader";
import FullTableLoader from "./fullTableLoader";

type Props<T> = {} & TableProps<T>;

const TableBody = <T,>({ columns, data, emptyIcon }: Props<T>) => {
	return (
		<>
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

				{!data?.length && (
					<TableEmpty columns={columns} emptyIcon={emptyIcon} />
				)}
			</tbody>
		</>
	);
};

export default TableBody;
