"use client";

import React from "react";
import useTableColumns from "../hooks/useTableColumns";
import Table from "@app/components/table";
import style from "../style.module.scss";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import { useSelector } from "react-redux";

type Props = {
	data: Record<string, any>[];
	restoreApi: () => Promise<any>;
};

const BinTableComponent = ({ data, restoreApi }: Props) => {
	const { columns } = useTableColumns({ restoreApi });

	return (
		<div className={style.tableWrapper}>
			<Table columns={columns} data={data} emptyIcon={EmptyTableIcon} />
		</div>
	);
};

export default BinTableComponent;
