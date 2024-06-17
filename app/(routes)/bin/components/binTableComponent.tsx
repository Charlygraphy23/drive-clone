"use client";

import useInfiniteLoop from "@/app/_hooks/useInfiniteLoop";
import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { addBulkResourcesAsync, appendBulkResources, deleteBinResourceByIdAsync } from "@/app/store/actions/bin.actions";
import { clearSelectedFolderId, getResourceInfoAsync } from "@/app/store/actions/info.actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import EmptyTableIcon from "@app/assets/emptyTableIcon.svg";
import Table from "@app/components/table";
import { Session } from "next-auth";
import { useState } from "react";
import useTableColumns from "../hooks/useTableColumns";
import style from "../style.module.scss";

type Props = {
	user?: Session["user"]
}

const BinTableComponent = ({ user }: Props) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const { selectedResourceId } = useAppSelector(state => state.resourceInfo)
	const { data, loading, isFetching, hasNext, isSubmitting } = useAppSelector(state => state.bin)
	const { columns } = useTableColumns();
	const dispatch = useAppDispatch()
	const { lastItemRef, scrollRef } = useInfiniteLoop({
		api: appendBulkResources,
		limit: 10,
		startPage: 1,
		triggerOnMount: addBulkResourcesAsync,
		isFetching,
		hasNext,
		showDeleted: true,
		user
	})

	const onRowClick = (val: FolderDataType) => {
		dispatch(getResourceInfoAsync({
			resourceId: val?._id,
			withDeleted: true
		}))

	}

	const handleSubmit = async (toggle: () => void, payload: ModalDataType) => {
		if (isDeleting) return;

		setIsDeleting(true)
		await dispatch(deleteBinResourceByIdAsync({ resourceId: payload?.id }))
		setIsDeleting(false)
		dispatch(clearSelectedFolderId())
		toggle();
	}

	return (
		<div ref={scrollRef} className={style.tableWrapper}>
			<Table<FolderDataType>
				lastItemRef={lastItemRef}
				columns={columns}
				data={data}
				emptyIcon={EmptyTableIcon}
				isLoading={isSubmitting}
				onRowClick={onRowClick}
				selectedRowDataId={selectedResourceId}
				dataKey={"_id"}
				listLoading={loading}
			/>

			<ConfirmationModalComponent
				onSubmit={handleSubmit}
				message='Are you want to delete?'
				isLoading={isDeleting}
			/>
		</div>
	);
};

export default BinTableComponent;
