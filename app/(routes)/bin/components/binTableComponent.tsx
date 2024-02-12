"use client";

import React from "react";
import useTableColumns from "../hooks/useTableColumns";
import Table from "@app/components/table";
import style from "../style.module.scss";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import { useMutation } from "@tanstack/react-query";
import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";

type Props = {
	data: Record<string, any>[];
	restoreApi: () => Promise<any>;
	deleteApi: () => Promise<any>;
};

const BinTableComponent = ({ data, restoreApi, deleteApi }: Props) => {
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

			<ConfirmationModalComponent
				api={deleteApi}
				message='Are you want to delete?'
			/>
		</div>
	);
};

export default BinTableComponent;
