"use client";

import React from "react";
import FileAction from "../components/fileAction";
import PDFLogo from "@app/assets/pdf-icon.svg";

const useFileColumns = () => {
	const columns = [
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
			render: ({ record }: any) => {
				return <FileAction data={record?.data} />;
			},
		},
	];

	return { columns };
};

export default useFileColumns;
