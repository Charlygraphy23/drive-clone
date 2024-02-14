"use client";

import React from "react";
import style from "../style.module.scss";

type Props = {
	value: string;
	dataIndex?: string;
};

const ProfilePasswordChange = ({ value }: Props) => {
	return (
		<div className={style.inputPasswordGroup}>
			<div>
				<p>{value}</p>
				<label htmlFor=''>Password</label>
			</div>

			<button className='button'>Change</button>
		</div>
	);
};

export default ProfilePasswordChange;
