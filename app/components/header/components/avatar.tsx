"use client";

import MyDropdown from "@/app/components/dropdown";
import { useAppSelector } from "@/app/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AvatarComponent from "../../avatar";
import style from "../style.module.scss";

const TopBarAvatar = () => {
	const session = useSession()
	const pathname = usePathname();
	const isProfileRoute = /^\/profile/.test(pathname);
	const { data } = useAppSelector(state => state.profile)

	const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		await signOut({
			callbackUrl: "/login"
		})
	}

	return (
		<MyDropdown
			handler={{
				render: () => <AvatarComponent isLoading={session.status === "loading"} user={data} />,
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
