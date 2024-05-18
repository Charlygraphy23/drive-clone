"use client";

import MyDropdown from "@/app/components/dropdown";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { useAppDispatch } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
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
	const ref = useRef<HTMLDivElement>(null)


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

	const findElements = useCallback((target: Node) => {
		const IDs = ["resource-info-button", "resource-info", "more-option"]
		const classes = [".ant-select-dropdown", ".selectAccessType", ".selectAccessList"]

		const t = target as HTMLElement
		if (t?.dataset?.icon === "close") return true

		const hasElementWithId = IDs.reduce((prev, Id) => {
			const element = document.getElementById(Id)
			const isContains = element?.contains(target)
			if (isContains) return true;
			if (prev) return prev;

			return false;
		}, false)

		const hasElementWithClass = classes.reduce((prev, Id) => {
			const element = document.querySelector(Id)
			const isContains = element?.contains(target)
			if (isContains) return true;
			if (prev) return prev;

			return false;
		}, false)



		return hasElementWithId || hasElementWithClass
	}, [])

	const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		console.log(`handleDelete`, data)

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


	useEffect(() => {
		function checkClick(e: MouseEvent) {
			if (!ref.current) return;

			const target = e.target as Node
			const hasElement = findElements(target)
			const shouldReset = !ref?.current.contains(target) && !hasElement
			if (shouldReset) {
				clearState()
			}
		}

		document.addEventListener("click", checkClick)
		return () => {
			document.removeEventListener("click", checkClick)
		}
	}, [clearState, findElements])

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
						<span> Move to trash </span>
					</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
		</div>
	);
};

export default FolderSkeleton;
