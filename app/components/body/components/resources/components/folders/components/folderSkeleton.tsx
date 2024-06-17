"use client";

import MyDropdown from "@/app/components/dropdown";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { useAppDispatch } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { useRouter } from "next/navigation";
import style from "../../../style.module.scss";

type Props = {
	data: FolderDataType;
	isSelected?: boolean;
	href: string
	onClick: (_id: string, _e: React.MouseEvent<HTMLDivElement>,) => void;
	isShared?: boolean;
};

const FolderSkeleton = ({ data, isSelected, href, onClick, isShared }: Props) => {
	const dispatch = useAppDispatch();
	const router = useRouter()
	const access = data?.access

	const handleRenameClient = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		dispatch(
			toggleModal({
				isOpen: true,
				data: {
					id: data?._id,
					type: DATA_TYPE.FOLDER,
					value: data?.name ?? "",
				},
				name: "renameModal",
			})
		);
	};

	const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		router.push(href)
	}

	const onSingleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isSelected) return onDoubleClick(e)
		onClick(data?._id, e,)
	}

	const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		dispatch(
			toggleModal({
				isOpen: true,
				data: {
					id: data?._id,
					type: DATA_TYPE.FOLDER,
					value: data.name ?? ""
				},
				name: "deleteModal",
			})
		);
	}

	return (
		<div id="my_folder" className={`${style.skeleton} ${isSelected ? style.selected : ""}`}
			onDoubleClick={onDoubleClick}
			onClick={onSingleClick}>
			<div className={`${style.label} d-flex`}>
				<i className='bi bi-folder-fill'></i>
				<p>{data?.name}</p>
			</div>

			<MyDropdown
				className={style.dropdown}
				handler={{
					className: style.dropdownItem,
					render: () => <i id="more-option" className='bi bi-three-dots-vertical' onClick={e => {
						e.preventDefault()
						e.stopPropagation()
					}}></i>,
				}}>
				<MyDropdown.Menu>
					<MyDropdown.List className='d-flex' onClick={handleRenameClient}>
						<i className='bi bi-pen-fill'></i>
						<span> Rename </span>
					</MyDropdown.List>

					<MyDropdown.List divider></MyDropdown.List>

					<MyDropdown.List className='d-flex' onClick={handleDelete}>
						<i className='bi bi-trash3-fill'></i>
						{isShared ? <span> Remove </span> : <span> Move to trash </span>}
					</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
		</div>
	);
};

export default FolderSkeleton;
