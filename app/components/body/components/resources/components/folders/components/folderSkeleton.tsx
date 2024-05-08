"use client";

import MyDropdown from "@/app/components/dropdown";
import { DATA_TYPE } from "@/app/interfaces/index.interface";
import { useAppDispatch } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import style from "../../../style.module.scss";

type Props = {
	data: FolderDataType;
	isSelected?: boolean;
	href: string
	onClick: (_id: string, _e: React.MouseEvent<HTMLDivElement>,) => void
	clearState: () => void
};

const FolderSkeleton = ({ data, isSelected, href, onClick, clearState }: Props) => {
	const dispatch = useAppDispatch();
	const router = useRouter()
	const handleRenameClient = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		dispatch(
			toggleModal({
				isOpen: true,
				data: {
					folderId: data?._id,
					type: DATA_TYPE.FOLDER,
					value: data?.name ?? "",
				},
				name: "renameModal",
			})
		);
	};
	const ref = useRef<HTMLDivElement>(null)


	const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		router.push(href)
	}

	const onSingleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isSelected) return onDoubleClick(e)
		onClick(data?._id, e,)
	}


	useEffect(() => {
		function checkClick(e: MouseEvent) {
			if (!ref.current) return;

			const target = e.target as any
			const Id = target?.id
			const shouldReset = !ref?.current.contains(target as Node) && (!["resource-info"].includes(Id))
			if (shouldReset) {
				clearState()
			}
		}

		document.addEventListener("click", checkClick)
		return () => {
			document.removeEventListener("click", checkClick)
		}
	}, [clearState])

	return (
		<div ref={ref} className={`${style.skeleton} ${isSelected ? style.selected : ""}`}
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
					render: () => <i className='bi bi-three-dots-vertical'></i>,
				}}>
				<MyDropdown.Menu>
					<MyDropdown.List className='d-flex' onClick={handleRenameClient}>
						<i className='bi bi-pen-fill'></i>
						<span> Rename </span>
					</MyDropdown.List>

					<MyDropdown.List divider></MyDropdown.List>

					<MyDropdown.List className='d-flex'>
						<i className='bi bi-trash3-fill'></i>
						<span> Move to trash </span>
					</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
		</div>
	);
};

export default FolderSkeleton;
