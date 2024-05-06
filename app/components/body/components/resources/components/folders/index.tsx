"use client";

import { useAppSelector } from "@/app/store";
import Link from "next/link";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";


const FolderComponent = () => {
	const { data } = useAppSelector(state => state.folders)

	return (
		<>
			{data?.length && <div className={`${style.folders} mb-5`}>
				<h6>Folders</h6>

				<div className={style.folderContainer}>
					{data.map((folder) => (
						<Link key={folder?._id} href={`/q/${folder?._id}`}>
							<FolderSkeleton data={folder} />
						</Link>
					))}
				</div>
			</div> || null}

		</>
	);
};

export default FolderComponent;
