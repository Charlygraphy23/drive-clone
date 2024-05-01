"use client";

import MyDropdown from "@/app/components/dropdown";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "../style.module.scss";

const TopBarAvatar = () => {
	const pathname = usePathname();

	const isProfileRoute = /^\/profile/.test(pathname);

	const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		await signOut({
			callbackUrl: "/login"
		})
	}

	return (
		<MyDropdown
			className={style.avatar__wrapper}
			handler={{
				className: style.img__wrapper,
				render: () => (
					// eslint-disable-next-line @next/next/no-img-element
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
					<Link className='dropdown-item' href='#' onClick={handleLogout}>
						Logout
					</Link>
				</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default TopBarAvatar;
