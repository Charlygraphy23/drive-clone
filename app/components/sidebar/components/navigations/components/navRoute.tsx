"use client";

import React from "react";
import style from "../style.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	path: string;
	label: string;
	icon: React.ReactElement;
};

function NavRoute({ path, label, icon }: Props) {
	const pathname = usePathname();

	const isActive = pathname === path;

	return (
		<Link
			className={`${style.navRoute} ${isActive && style.active}`}
			href={path}>
			<div className={style.navRoute__icon}>{icon}</div>
			<div className={style.navRoute__label}>{label}</div>
		</Link>
	);
}

export default NavRoute;
