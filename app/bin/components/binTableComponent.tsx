"use client";

import React from "react";
import useTableColumns from "../hooks/useTableColumns";
import Table from "@app/components/table";
import style from "../style.module.scss";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";

type Props = {
	data: Record<string, any>[];
};

const BinTableComponent = ({ data }: Props) => {
	const { columns } = useTableColumns();

	return (
		<div className={style.tableWrapper}>
			<Table columns={columns} data={data} emptyIcon={EmptyTableIcon} />
		</div>
	);
};

export default BinTableComponent;
