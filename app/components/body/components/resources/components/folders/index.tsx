"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { getResourceInfoAsync } from "@/app/store/actions/info.actions";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";

type Props = {
	isShared?: boolean;
}

const FolderComponent = ({ isShared }: Props) => {
	const { data } = useAppSelector(state => state.folders)
	const { selectedResourceId } = useAppSelector(state => state.resourceInfo)

	const ref = useRef<string>("")

	const dispatch = useAppDispatch()
	const params = useParams<{ folderId: string }>()


	const handleClick = (folderId: string) => {
		dispatch(getResourceInfoAsync({
			resourceId: folderId
		}))
	}


	useEffect(() => {
		const folderId = params?.folderId
		if (ref.current === folderId) return
		if (!folderId) return;

		dispatch(getResourceInfoAsync({
			resourceId: params.folderId
		}))

		ref.current = folderId

	}, [dispatch, params])

	return (
		<>
			{data?.length && <div className={`${style.folders} mb-5`}>
				<h6>Folders {data?.length > 0 ? <>({data?.length})</> : null}</h6>

				<div className={style.folderContainer}>
					{data.map((folder) => (
						<FolderSkeleton
							key={folder?._id}
							data={folder}
							isSelected={selectedResourceId === folder?._id}
							href={`/q/${folder?._id}`}
							onClick={handleClick}
							isShared={isShared}
						/>
					))}
				</div>
			</div> || null}

		</>
	);
};

export default FolderComponent;
