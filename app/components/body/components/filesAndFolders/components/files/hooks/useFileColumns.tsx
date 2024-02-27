"use client";

import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import PDFLogo from "@app/assets/pdf-icon.svg";
import { OwnerAccessObject } from "../../../interfaces/index.interface";
import style from '../../../style.module.scss';
import OwnerSection from "../../ownerSection";
import FileAction from "../components/fileAction";

const useFileColumns = () => {
	const columns: ColumnType[] = [
		{
			title: "Name",
			dataIndex: "name",
			icon: PDFLogo,
		},
		{
			title: "Owner",
			dataIndex: "owner",
			render: ({ record, value }) => <OwnerSection data={value as OwnerAccessObject} className={style.owner} />
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
