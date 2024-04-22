"use client";

import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import Table from "@app/components/table";
import { useMutation } from "@tanstack/react-query";
import useTableColumns from "../hooks/useTableColumns";
import style from "../style.module.scss";

type Props = {
	data: Record<string, unknown>[];
	restoreApi: () => Promise<unknown>;
	deleteApi: () => Promise<unknown>;
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
