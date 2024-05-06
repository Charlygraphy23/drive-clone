"use client";

import MyDropdown from "@/app/components/dropdown";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AvatarComponent from "../../avatar";
import style from "../style.module.scss";

const TopBarAvatar = () => {
	const pathname = usePathname();

	const isProfileRoute = /^\/profile/.test(pathname);

	const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		await signOut({
			callbackUrl: "/login"
		})
	}

	return (
		<MyDropdown
			handler={{
				render: () => <AvatarComponent />,
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
