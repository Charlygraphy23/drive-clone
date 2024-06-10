"use client";

import { TableProps } from "../interfaces/index.interface";
import TableEmpty from "./tableEmpty";
import TableRow from "./tableRow";

type Props<T> = { lastItemRef?: React.Ref<any> } & TableProps<T>

const TableBody = <T,>({ columns, data, emptyIcon, onRowClick, selectedRowDataId, dataKey, lastItemRef, listLoading }: Props<T>) => {
	const isSelectable = data?.length > 0


	return (
		<>
			<tbody>
				{data?.map((val, key) => {
					if (key === data?.length - 1 && !listLoading) {
						return <TableRow
							key={key}
							isActive={selectedRowDataId === val?.[dataKey]}
							isSelectable={isSelectable}
							val={val}
							lastItemRef={lastItemRef}
							columns={columns}
							onRowClick={onRowClick}
						/>
					}

					return <TableRow
						key={key}
						isActive={selectedRowDataId === val?.[dataKey]}
						isSelectable={isSelectable}
						val={val}
						columns={columns}
						onRowClick={onRowClick}
					/>


				})}

				{!data?.length && (
					<TableEmpty columns={columns} emptyIcon={emptyIcon} />
				)}
			</tbody>
		</>
	);
};

export default TableBody;
