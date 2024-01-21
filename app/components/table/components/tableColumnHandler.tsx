import React from "react";
import { ColumnType } from "../interface/index.interface";
import style from "../style.module.scss";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
	data: any;
} & ColumnType;

const TableColumnHandler = ({
	render,
	dataIndex,
	data,
	title,
	icon,
}: Props) => {
	const handleDataMapping = () => {
		const path = dataIndex ?? "";
		const spitedPath = path?.split(".");
		return spitedPath.reduce(
			(prevData: any, currData: any) => prevData?.[currData],
			data
		);
	};

	const renderIcon = () => {
		if (React.isValidElement(icon)) return icon;

		return (
			<Image className={style.icon} src={icon as StaticImport} alt='icon' />
		);
	};

	if (render)
		return render({
			record: { dataIndex, data, title },
			value: handleDataMapping(),
		});

	return (
		<div className={style.columnHandler}>
			{icon && renderIcon()}
			<span>{handleDataMapping()}</span>
		</div>
	);
};

export default TableColumnHandler;
