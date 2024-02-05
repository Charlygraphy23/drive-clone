"use client";

import React from "react";
import { ColumnType } from "../interfaces/index.interface";
import { isInCenter } from "../utils/index.utils";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import style from "../style.module.scss";

type Props = {
	columns: ColumnType[];
	emptyIcon?: React.ReactElement | StaticImport | string;
};

const TableEmpty = ({ columns, emptyIcon }: Props) => {
	return (
		<tr>
			{columns?.map((column, index) => {
				if (isInCenter(index, columns.length))
					return !emptyIcon ? (
						<td key={index}>No Item Found</td>
					) : (
						<td key={index}>
							<div className={style.empty}>
								<Image
									height={300}
									className={style.emptyImage}
									src={emptyIcon as StaticImport}
									alt='Empty icon table'
								/>
								<span>No Item Found!</span>
							</div>
						</td>
					);

				return <td key={index}></td>;
			})}
		</tr>
	);
};

export default TableEmpty;
