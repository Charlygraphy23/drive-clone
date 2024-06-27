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
	dataKey,
	lastItemRef,
	listLoading,
	id = "",
	onRowDoubleClick
}: { lastItemRef?: React.Ref<any> } & TableProps<T>) => {

	return (
		<section id={id} className={style.table}>
			<table cellSpacing={10}>
				<TableHeader columns={columns} />
				<TableBody<T>
					columns={columns}
					data={data}
					emptyIcon={emptyIcon}
					isLoading={isLoading}
					onRowClick={onRowClick}
					onRowDoubleClick={onRowDoubleClick}
					selectedRowDataId={selectedRowDataId}
					dataKey={dataKey}
					lastItemRef={lastItemRef}
					listLoading={listLoading}
				/>
			</table>
			{isLoading && <FullTableLoader />}
			{listLoading && <div className="d-flex align-items-center justify-content-center my-2">
				<div className="spinner-border  text-dark" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>}
			{/* {listLoading && <div><FileLoader /></div>} */}
		</section>
	);
};

export default MyTable;
