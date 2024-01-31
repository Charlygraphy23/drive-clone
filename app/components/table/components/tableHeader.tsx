import React from "react";
import { ColumnType } from "../interfaces/index.interface";

type Props = {
	columns: ColumnType[];
};

const TableHeader = ({ columns }: Props) => {
	return (
		<thead>
			<tr>
				{columns?.map((column, index) => (
					<th key={index}>{column?.title}</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
