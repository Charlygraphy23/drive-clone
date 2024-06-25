"use client";

import MyTable from "@/app/components/table";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { getResourceInfoAsync } from "@/app/store/actions/info.actions";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import useFileColumns from "../hooks/useFileColumns";

type Props = { lastItemRef?: React.Ref<any>, isShared?: boolean }

const FileComponent = ({ lastItemRef, isShared }: Props) => {
	const { columns } = useFileColumns({ isShared });
	const { data } = useAppSelector(
		(state) => state?.files
	);
	const { selectedResourceId } = useAppSelector(state => state.resourceInfo)
	const { loading } = useAppSelector(state => state.files)
	const dispatch = useAppDispatch();

	const handleRowClick = (val: FileDataType) => {
		if (!val) return;

		dispatch(getResourceInfoAsync({
			resourceId: val?._id
		}))

		dispatch(toggleModal({
			isOpen: true,
			name: "previewModal",
			data: {
				id: val?._id,
				...val
			}
		}))
	}

	return <MyTable<FileDataType>
		dataKey={"_id"}
		columns={columns}
		data={data}
		lastItemRef={lastItemRef}
		listLoading={loading}
		onRowClick={handleRowClick}
		selectedRowDataId={selectedResourceId}
		id="my_table"

	/>
};

export default FileComponent;
