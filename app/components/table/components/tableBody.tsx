"use client";

import React from "react";
import TableColumnHandler from "./tableColumnHandler";
import TableEmpty from "./tableEmpty";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { FolderStateType } from "@/app/store/reducers/folders.reducers";
import { ColumnType } from "../interfaces/index.interface";

type Props = {
	columns: ColumnType[];
};

const TableBody = ({ columns }: Props) => {
	const { data } = useSelector<RootState, FolderStateType>(
		(state) => state?.files
	);

	return (
		<tbody>
			{data?.map((val, key) => (
				<tr key={key}>
					{columns?.map((column, i) => {
						if (i === 0)
							return (
								<th key={i}>{<TableColumnHandler data={val} {...column} />}</th>
							);
						return (
							<td key={i}>{<TableColumnHandler data={val} {...column} />}</td>
						);
					})}
				</tr>
			))}

			{/* {loading &&
				Array(4)
					.fill(0)
					.map((_, index) => <TableLoader key={index} columns={columns} />)} */}

			{!data?.length && <TableEmpty columns={columns} />}
		</tbody>
	);
};

export default TableBody;
