import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import React from "react";
import TableAction from "../components/tableAction";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
	restoreApi: UseMutateFunction;
};

const useTableColumns = ({ restoreApi }: Props) => {
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
			render: function ({ value }) {
				if (!value) return "-";
				const sizeInBytes = +value;
				const bytesToMb = 1024 * 1024;

				return `${(sizeInBytes / bytesToMb).toPrecision(1)}MB`;
			},
		},

		{
			title: "Original Location",
			dataIndex: "path",
		},

		{
			title: "",
			dataIndex: "",
			render: ({ record }) => {
				return <TableAction restoreApi={restoreApi} />;
			},
		},
	];

	return { columns };
};

export default useTableColumns;
