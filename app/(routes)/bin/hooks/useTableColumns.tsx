import OwnerSection from "@/app/components/body/components/resources/components/ownerSection";
import { OwnerAccessObject } from "@/app/components/body/components/resources/interfaces/index.interface";
import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import TableAction from "../components/tableAction";
import style from "../style.module.scss";

type Props = {
	mutation: UseMutationResult<AxiosResponse>
}

const useTableColumns = ({ mutation }: Props) => {

	const columns: ColumnType[] = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Owner",
			dataIndex: "owner",
			render: ({ record }) => <OwnerSection data={record.data as OwnerAccessObject} className={style.owner} />
		},

		{
			title: "Date binned",
			dataIndex: "createdAt",
			render: ({ value }) => dayjs(String(value)).format("YYYY-MM-DD")
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

		// {
		// 	title: "Original Location",
		// 	dataIndex: "path",
		// },

		{
			title: "",
			dataIndex: "",
			render: ({ record }) => {
				return <TableAction
					data={record?.data as FolderDataType}
					mutation={mutation}
				/>;
			},
		},
	];

	return { columns };
};

export default useTableColumns;
