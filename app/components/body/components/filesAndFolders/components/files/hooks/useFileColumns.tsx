"use client";

import React from "react";
import FileAction from "../components/fileAction";
import PDFLogo from "@app/assets/pdf-icon.svg";
import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import { FileDataType } from "@/app/store/reducers/files.reducers";

const useFileColumns = () => {
	const columns: ColumnType[] = [
		{
			title: "Name",
			dataIndex: "name",
			icon: PDFLogo,
		},
		{
			title: "Member",
			dataIndex: "member",
		},

		{
			title: "Last Modified",
			dataIndex: "lastModified",
		},

		{
			title: "",
			dataIndex: "",
			render: ({ record }) => {
				return <FileAction data={record?.data as FileDataType} />;
			},
		},
	];

	return { columns };
};

export default useFileColumns;
