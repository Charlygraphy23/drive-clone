"use client";

import React from "react";
import style from "../style.module.scss";

type Props = {
	size: number;
};

const TableLoader = ({ size }: Props) => {
	return (
		<tr className={style.skelton}>
			{Array(size)
				.fill(0)
				?.map((_, index) => (
					<td key={index}>
						<div></div>
					</td>
				))}
		</tr>
	);
};

export default TableLoader;
