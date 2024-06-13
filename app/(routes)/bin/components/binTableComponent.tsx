"use client";

import { deleteForeverApi } from "@/app/_apis_routes/resources";
import useInfiniteLoop from "@/app/_hooks/useInfiniteLoop";
import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { appendBulkResources } from "@/app/store/actions/bin.actions";
import { clearSelectedFolderId, getResourceInfoAsync } from "@/app/store/actions/info.actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import Table from "@app/components/table";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useTableColumns from "../hooks/useTableColumns";
import style from "../style.module.scss";



const BinTableComponent = () => {
	const { selectedResourceId } = useAppSelector(state => state.resourceInfo)
	const { data, loading, isFetching, hasNext } = useAppSelector(state => state.bin)
	const deleteMutation = useMutation({ mutationFn: deleteForeverApi });
	const router = useRouter()
	const { columns } = useTableColumns();
	const dispatch = useAppDispatch()
	const { lastItemRef, scrollRef } = useInfiniteLoop({
		api: appendBulkResources,
		limit: 10,
		startPage: 1,
		triggerOnMount: true,
		isFetching,
		hasNext
	})

	const onRowClick = (val: FolderDataType) => {
		dispatch(getResourceInfoAsync({
			resourceId: val?._id,
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
		<div ref={scrollRef} className={style.tableWrapper}>
			<Table<FolderDataType>
				lastItemRef={lastItemRef}
				columns={columns}
				data={data}
				emptyIcon={EmptyTableIcon}
				isLoading={mutation?.isPending}
				onRowClick={onRowClick}
				selectedRowDataId={selectedResourceId}
				dataKey={"_id"}
				listLoading={loading}
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
