"use client";

import Link from "next/link";
import React from "react";
import style from "../style.module.scss";
import MyDropdown from "@/app/components/dropdown";
import { usePathname } from "next/navigation";

const TopBarAvatar = () => {
	const pathname = usePathname();

	const isProfileRoute = /^\/profile/.test(pathname);

	return (
		<MyDropdown
			className={style.avatar__wrapper}
			handler={{
				className: style.img__wrapper,
				render: () => (
					<img
						src='https://images.pexels.com/photos/18489099/pexels-photo-18489099/free-photo-of-man-in-white-shirt-with-book-in-hands.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
						alt='avatar-image'
					/>
				),
			}}>
			<MyDropdown.Menu>
				<MyDropdown.List className={isProfileRoute ? style.active : ""}>
					<Link className='dropdown-item' href='/profile'>
						View Profile
					</Link>
				</MyDropdown.List>

				<MyDropdown.List>
					<Link className='dropdown-item' href='/logout'>
						Logout
					</Link>
				</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default TopBarAvatar;
