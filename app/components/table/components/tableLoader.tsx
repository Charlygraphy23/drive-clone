"use client";

import React from "react";
import style from "../style.module.scss";
import { ColumnType } from "../interface/index.interface";

type Props = {
	columns: ColumnType[];
};

const TableLoader = ({ columns }: Props) => {
	return (
		<tr className={style.skelton}>
			{columns?.map((_, index) => (
				<td key={index}>
					<div></div>
				</td>
			))}
		</tr>
	);
};

export default TableLoader;
