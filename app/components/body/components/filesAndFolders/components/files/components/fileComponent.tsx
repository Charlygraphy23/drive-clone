"use client";

import React from "react";
import useFileColumns from "../hooks/useFileColumns";
import MyTable from "@/app/components/table";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
	FolderDataType,
	FolderStateType,
} from "@/app/store/reducers/folders.reducers";

const FileComponent = () => {
	const { columns } = useFileColumns();
	const { data } = useSelector<RootState, FolderStateType>(
		(state) => state?.files
	);

	return <MyTable<FolderDataType> columns={columns} data={data} />;
};

export default FileComponent;
