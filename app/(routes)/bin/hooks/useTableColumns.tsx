import OwnerSection from "@/app/components/body/components/resources/components/ownerSection";
import { OwnerAccessObject } from "@/app/components/body/components/resources/interfaces/index.interface";
import { getFileIconByType } from "@/app/components/fileListItem/utils/index.utils";
import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { formatBytes } from "@/app/utils/index.utils";
import mimeType from "mime-types";
import Image from "next/image";
import TableAction from "../components/tableAction";
import style from "../style.module.scss";


const useTableColumns = () => {

	const columns: ColumnType[] = [
		{
			title: "Name",
			dataIndex: "name",
			icon: (data: FileDataType) => {
				const name = data?.name as string
				const dataType = data?.dataType as DATA_TYPE

				if (dataType === DATA_TYPE.FILE) {
					const type = mimeType.lookup(name).toString()
					return type ? <Image src={getFileIconByType(type)} width={20} height={20} alt="cions" /> : null
				}

				return <i className="bi bi-folder-fill" style={{ color: "#5f6368" }}></i>

			},
		},
		{
			title: "Owner",
			dataIndex: "userInfo",
			render: ({ value }) => <OwnerSection data={value as OwnerAccessObject["userInfo"]} className={style.owner} />
		},

		// {
		// 	title: "Date binned",
		// 	dataIndex: "createdAt",
		// 	render: ({ value }) => dayjs(String(value)).format("YYYY-MM-DD")
		// },

		{
			title: "File Size",
			dataIndex: "fileSize",
			render: function ({ value }) {
				if (!value) return "-";
				return <small>{formatBytes(+value)}</small>
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
				/>;
			},
		},
	];

	return { columns };
};

export default useTableColumns;
