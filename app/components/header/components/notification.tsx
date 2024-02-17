"use client";

import React from "react";
import style from "../style.module.scss";
import MyDropdown from "../../dropdown/index";
import NotificationMessage from "./notificationMessage";
import Link from "next/link";

const TopbarNotification = () => {
	return (
		<div className={style.notification__wrapper}>
			<MyDropdown
				handler={{
					render: () => <i className={`bi bi-bell-fill ${style.bellIcon}`}></i>,
				}}>
				<MyDropdown.Menu>
					<div className={style.notificationBody}>
						<div className={style.notificationHead}>
							<h4>Notification</h4>
							<span>4</span>
						</div>
						<div className={style.notifications}>
							<NotificationMessage />
						</div>
						<div className={style.notificationFooter}>
							<Link href='/'>More Notifications</Link>
						</div>
					</div>
				</MyDropdown.Menu>
			</MyDropdown>
		</div>
	);
};

export default TopbarNotification;
