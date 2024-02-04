import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import React from "react";
import TableAction from "../components/tableAction";

const useTableColumns = () => {
	const columns: ColumnType[] = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Member",
			dataIndex: "member",
		},

		{
			title: "Date binned",
			dataIndex: "createdAt",
		},

		{
			title: "File Size",
			dataIndex: "size",
		},

		{
			title: "Original Location",
			dataIndex: "path",
		},

		{
			title: "",
			dataIndex: "",
			render: ({ record }) => {
				return <TableAction />;
			},
		},
	];

	return { columns };
};

export default useTableColumns;
