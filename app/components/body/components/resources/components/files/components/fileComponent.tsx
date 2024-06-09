"use client";

import MyTable from "@/app/components/table";
import { useAppSelector } from "@/app/store";
import {
	FolderDataType
} from "@/app/store/reducers/folders.reducers";
import useFileColumns from "../hooks/useFileColumns";

type Props = { lastItemRef?: React.Ref<any> }

const FileComponent = ({ lastItemRef }: Props) => {
	const { columns } = useFileColumns();
	const { data } = useAppSelector(
		(state) => state?.files
	);

	return <MyTable<FolderDataType> dataKey={"_id"} columns={columns} data={data} lastItemRef={lastItemRef} />
};

export default FileComponent;
