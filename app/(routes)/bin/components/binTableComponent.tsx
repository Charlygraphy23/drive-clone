"use client";

import { restoreFromTrashApi } from "@/app/_apis_routes/resources";
import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getFolderInfoAsync } from "@/app/store/actions/info.actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import Table from "@app/components/table";
import { useMutation } from "@tanstack/react-query";
import useTableColumns from "../hooks/useTableColumns";
import style from "../style.module.scss";

type Props = {
	data: FolderDataType[];
	deleteApi: () => Promise<unknown>;
};

const BinTableComponent = ({ data, deleteApi }: Props) => {
	const { selectedFolderId } = useAppSelector(state => state.resourceInfo)
	const mutation = useMutation({ mutationFn: restoreFromTrashApi });
	const { columns } = useTableColumns({ mutation });
	const dispatch = useAppDispatch()

	const onRowClick = (val: FolderDataType) => {
		dispatch(getFolderInfoAsync({
			folderId: val?._id,
			withDeleted: true
		}))

	}

	return (
		<div className={style.tableWrapper}>
			<Table<FolderDataType>
				columns={columns}
				data={data}
				emptyIcon={EmptyTableIcon}
				isLoading={mutation?.isPending}
				onRowClick={onRowClick}
				selectedRowDataId={selectedFolderId}
				dataKey={"_id"}
			/>

			<ConfirmationModalComponent
				api={deleteApi}
				message='Are you want to delete?'
			/>
		</div>
	);
};

export default BinTableComponent;
