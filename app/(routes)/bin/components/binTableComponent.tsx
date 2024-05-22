"use client";

import { deleteForeverApi, restoreFromTrashApi } from "@/app/_apis_routes/resources";
import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { clearSelectedFolderId, getFolderInfoAsync } from "@/app/store/actions/info.actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import Table from "@app/components/table";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useTableColumns from "../hooks/useTableColumns";
import style from "../style.module.scss";

type Props = {
	data: FolderDataType[];
};

const BinTableComponent = ({ data }: Props) => {
	const { selectedFolderId } = useAppSelector(state => state.resourceInfo)
	const mutation = useMutation({ mutationFn: restoreFromTrashApi });
	const deleteMutation = useMutation({ mutationFn: deleteForeverApi });
	const router = useRouter()
	const { columns } = useTableColumns({ mutation });
	const dispatch = useAppDispatch()

	const onRowClick = (val: FolderDataType) => {
		dispatch(getFolderInfoAsync({
			folderId: val?._id,
			withDeleted: true
		}))

	}

	const handleSubmit = async (toggle: () => void, resourceId: string) => {
		if (deleteMutation?.isPending) return;
		await deleteMutation?.mutateAsync(resourceId);
		toggle();
		dispatch(clearSelectedFolderId())
		router.refresh()
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
				onSubmit={handleSubmit}
				message='Are you want to delete?'
				isLoading={deleteMutation?.isPending}
			/>
		</div>
	);
};

export default BinTableComponent;
