"use client";

import React from "react";
import style from "../style.module.scss";
import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTimePlugin);

const notifiMessages = [
	{
		type: "upload",
		title: "File Uploaded",
		data: {},
		time: new Date().toDateString(),
	},
	{
		type: "upload",
		title: "File Uploaded",
		data: {},
		time: new Date().toDateString(),
	},
	{
		type: "upload",
		title: "File Uploaded",
		data: {},
		time: new Date().toDateString(),
	},
	{
		type: "upload",
		title: "File Uploaded",
		data: {},
		time: new Date().toDateString(),
	},
];

const NotificationMessage = () => {
	const getIcon = (type: string) => {
		if (type === "upload") return <i className='bi bi-cloud-arrow-up'></i>;
		return <i className='bi bi-cloud-arrow-up'></i>;
	};

	return (
		<>
			{notifiMessages.map((val, index) => (
				<div key={index} className={style.messages}>
					{getIcon(val.type)}
					<div className={style.description}>
						<p>{val?.title}</p>
						<span>{val?.time}</span>
					</div>
					<div className={style.action}>
						<span>{dayjs(val?.time).fromNow()}</span>
						<i className='bi bi-arrow-right-short'></i>
					</div>
				</div>
			))}
		</>
	);
};

export default NotificationMessage;
