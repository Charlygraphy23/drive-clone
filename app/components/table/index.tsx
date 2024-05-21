"use client";

import FullTableLoader from "./components/fullTableLoader";
import TableBody from "./components/tableBody";
import TableHeader from "./components/tableHeader";
import { TableProps } from "./interfaces/index.interface";
import style from "./style.module.scss";

const MyTable = <T,>({
	columns,
	data,
	emptyIcon,
	isLoading,
	onRowClick,
	selectedRowDataId,
	dataKey
}: TableProps<T>) => {

	return (
		<section className={style.table}>
			<table cellSpacing={10}>
				<TableHeader columns={columns} />
				<TableBody<T>
					columns={columns}
					data={data}
					emptyIcon={emptyIcon}
					isLoading={isLoading}
					onRowClick={onRowClick}
					selectedRowDataId={selectedRowDataId}
					dataKey={dataKey}
				/>
			</table>
			{isLoading && <FullTableLoader />}
		</section>
	);
};

export default MyTable;
