"use client";

import { getFileIconByType } from "@/app/components/fileListItem/utils/index.utils";
import { ColumnType } from "@/app/components/table/interfaces/index.interface";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import dayjs from "dayjs";
import mimeType from "mime-types";
import Image from "next/image";
import { OwnerAccessObject } from "../../../interfaces/index.interface";
import style from '../../../style.module.scss';
import OwnerSection from "../../ownerSection";
import FileAction from "../components/fileAction";

import relativeTimePlugin from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTimePlugin);

type Props = {
	isShared?: boolean
}

const useFileColumns = ({ isShared }: Props) => {
	const columns: ColumnType[] = [
		{
			title: "Name",
			dataIndex: "name",
			icon: (data: FileDataType) => {
				const name = data?.name as string
				const type = mimeType.lookup(name).toString()
				return type ? <Image src={getFileIconByType(type)} width={20} height={20} alt="cions" /> : null
			},
		},
		{
			title: "Owner",
			dataIndex: "userInfo",
			render: ({ value }) => <OwnerSection data={value as OwnerAccessObject["userInfo"]} className={style.owner} />
		},

		{
			title: "Last Modified",
			dataIndex: "lastModified",
			render: ({ value }) => dayjs(new Date(value as string)).fromNow()
		},

		{
			title: "",
			dataIndex: "",
			render: ({ record }) => {
				return <FileAction data={record?.data as FileDataType} isShared={isShared} />;
			},
		},
	];

	return { columns };
};

export default useFileColumns;
