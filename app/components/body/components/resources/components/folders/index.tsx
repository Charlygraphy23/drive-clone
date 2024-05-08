"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { clearSelectedFolderId, getFolderInfoAsync } from "@/app/store/actions/info.actions";
import style from "../../style.module.scss";
import FolderSkeleton from "./components/folderSkeleton";


const FolderComponent = () => {
	const { data } = useAppSelector(state => state.folders)
	const { selectedFolderId } = useAppSelector(state => state.resourceInfo)

	const dispatch = useAppDispatch()


	const handleClick = (folderId: string) => {
		dispatch(getFolderInfoAsync({
			folderId
		}))
	}

	const onClear = () => {
		dispatch(clearSelectedFolderId())
	}

	return (
		<>
			{data?.length && <div className={`${style.folders} mb-5`}>
				<h6>Folders</h6>

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
