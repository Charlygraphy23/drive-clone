"use client";

import MyTable from "@/app/components/table";
import { useAppSelector } from "@/app/store";
import {
	FolderDataType
} from "@/app/store/reducers/folders.reducers";
import useFileColumns from "../hooks/useFileColumns";

const FileComponent = () => {
	const { columns } = useFileColumns();
	const { data } = useAppSelector(
		(state) => state?.files
	);

	return <MyTable<FolderDataType> columns={columns} data={data} />
};

export default FileComponent;
