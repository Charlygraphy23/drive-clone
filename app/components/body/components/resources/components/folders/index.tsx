"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { clearSelectedFolderId, getFolderInfoAsync } from "@/app/store/actions/info.actions";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";


const FolderComponent = () => {
	const { data } = useAppSelector(state => state.folders)
	const { selectedFolderId } = useAppSelector(state => state.resourceInfo)
	const { manageAccessModal } = useAppSelector(state => state.modals)

	const ref = useRef<string>("")

	const dispatch = useAppDispatch()
	const params = useParams<{ folderId: string }>()


	const handleClick = (folderId: string) => {
		dispatch(getFolderInfoAsync({
			folderId
		}))
	}

	const onClear = () => {
		if (selectedFolderId)
			dispatch(clearSelectedFolderId())

		if (manageAccessModal) {
			dispatch(toggleModal({
				isOpen: false,
				name: "manageAccessModal",
			}))
		}

	}

	useEffect(() => {
		const folderId = params?.folderId
		if (ref.current === folderId) return
		if (!folderId) return;

		dispatch(getFolderInfoAsync({
			folderId: params.folderId
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
							isSelected={selectedFolderId === folder?._id}
							href={`/q/${folder?._id}`}
							onClick={handleClick}
							clearState={onClear}
						/>
					))}
				</div>
			</div> || null}

		</>
	);
};

export default FolderComponent;
