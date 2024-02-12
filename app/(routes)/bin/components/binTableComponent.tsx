"use client";

import React from "react";
import useTableColumns from "../hooks/useTableColumns";
import Table from "@app/components/table";
import style from "../style.module.scss";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

type Props = {
	data: Record<string, any>[];
	restoreApi: () => Promise<any>;
};

const BinTableComponent = ({ data, restoreApi }: Props) => {
	const { mutate, isPending } = useMutation({ mutationFn: restoreApi });
	const { columns } = useTableColumns({ restoreApi: mutate });

	return (
		<div className={style.tableWrapper}>
			<Table
				columns={columns}
				data={data}
				emptyIcon={EmptyTableIcon}
				isLoading={isPending}
			/>
		</div>
	);
};

export default BinTableComponent;
