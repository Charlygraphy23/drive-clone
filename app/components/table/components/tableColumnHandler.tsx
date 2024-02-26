import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ReactElement } from "react";
import { ColumnType } from "../interfaces/index.interface";
import style from "../style.module.scss";

type Props<T> = {
	data: T;
} & ColumnType;

const TableColumnHandler = <T,>({
	render,
	dataIndex,
	data,
	title,
	icon,
}: Props<T>) => {
	const handleDataMapping = () => {
		const path = dataIndex ?? "";
		const spitedPath = path?.split(".");
		return spitedPath.reduce<T>((_data, key) => {
			if (
				_data &&
				!Array.isArray(_data) &&
				typeof _data === "object" &&
				key in _data
			)
				return (_data as Record<string, any>)?.[key];

			return undefined;
		}, data);
	};

	const renderIcon = () => {
		if (React.isValidElement(icon)) return icon;

		return (
			<Image className={style.icon} src={icon as StaticImport} alt='icon' />
		);
	};

	if (render) {
		return render({
			record: { dataIndex, data, title },
			value: handleDataMapping() as ReactElement,
		});
	}

	return (
		<div className={style.columnHandler}>
			{icon && renderIcon()}
			<span>{(handleDataMapping() as ReactElement) ?? "-"}</span>
		</div>
	);
};

export default TableColumnHandler;
