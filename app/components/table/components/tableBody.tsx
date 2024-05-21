"use client";

import { TableProps } from "../interfaces/index.interface";
import style from '../style.module.scss';
import TableColumnHandler from "./tableColumnHandler";
import TableEmpty from "./tableEmpty";

type Props<T> = TableProps<T>

const TableBody = <T,>({ columns, data, emptyIcon, onRowClick, selectedRowDataId, dataKey }: Props<T>) => {
	const isSelectable = data?.length > 0

	return (
		<>
			<tbody>
				{data?.map((val, key) => (
					<tr key={key} className={`${selectedRowDataId === val?.[dataKey] ? style.active : ""} ${isSelectable ? style.selectable : ""}`} onClick={() => {
						if (onRowClick) onRowClick(val)
					}}>
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
