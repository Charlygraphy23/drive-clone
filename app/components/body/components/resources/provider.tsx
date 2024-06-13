"use client";

import { fetchFileData, fetchFolderData } from "@/app/_actions/resource";
import useInfiniteLoop from "@/app/_hooks/useInfiniteLoop";
import ResourceLoader from "@/app/components/loader/resourceLoader";
import { useAppDispatch, useAppSelector, useAppStore } from "@/app/store";
import { addBulkFiles, addBulkFolder, appendBulkFiles, toggleModal } from "@/app/store/actions";
import { clearSelectedFolderId } from "@/app/store/actions/info.actions";
import { Children, PropsWithChildren, cloneElement, memo, useCallback, useEffect, useRef, useState } from "react";
import DeleteConfirmationModal from "../modals/delete";
import NewfolderModal from "../modals/newfolder";
import RenameModal from "../modals/rename";
import style from "./style.module.scss";

type Props = {
	id?: string | null
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, id }: Props) => {
	const initializeData = useRef<string | null | undefined>(null);
	const store = useAppStore()
	const { selectedResourceId } = useAppSelector(state => state.resourceInfo)
	const { manageAccessModal } = useAppSelector(state => state.modals)
	const {
		renameModal,
		newFolderModal,
		deleteModal,
		data: modalState,
	} = useAppSelector((state) => state.modals);
	const { isFetching, hasNext } = useAppSelector(state => state.files)
	const { lastItemRef, scrollRef } = useInfiniteLoop({
		api: appendBulkFiles,
		startPage: 2,
		isFetching,
		hasNext
	})
	const dispatch = useAppDispatch()
	const [loader, setLoader] = useState(true)


	const disabledClick = useCallback((target: Node) => {
		const IDs = ["resource-info-button", "resource-info", "more-option", "more-option-file"]
		const classes = [".ant-select-dropdown", ".selectAccessType", ".selectAccessList"]
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

	const withParentElement = useCallback((target: Node) => {
		const myFolder = document.getElementById("my_folder")
		const myTable = document.getElementById("my_table")

		const isDisabled = disabledClick(target)
		console.log("isDisabled", isDisabled)

		//? If there is any element that has
		if (isDisabled) {
			return isDisabled
		}
		if (myTable?.contains(target)) {
			return true
		} else if (myFolder?.contains(target)) {
			return true
		}
		else false
	}, [disabledClick])

	const onClear = useCallback(() => {
		if (selectedResourceId)
			dispatch(clearSelectedFolderId())

		if (manageAccessModal) {
			dispatch(toggleModal({
				isOpen: false,
				name: "manageAccessModal",
			}))
		}

	}, [dispatch, manageAccessModal, selectedResourceId])



	useEffect(() => {

		function checkClick(e: MouseEvent) {
			const target = e.target as Node
			const hasElement = withParentElement(target)
			if (!hasElement) {
				onClear()
			}
		}

		document.addEventListener("click", checkClick)
		return () => {
			document.removeEventListener("click", checkClick)
		}
	}, [onClear, withParentElement])

	const handleInitialDataLoad = useCallback(async () => {
		const [folders, filesData] = await Promise.all([
			fetchFolderData(id ?? ""),
			fetchFileData(id ?? "")
		])
		console.log("filesData", filesData)
		store.dispatch(addBulkFiles({ data: filesData?.resources, next: filesData?.next }))
		store.dispatch(addBulkFolder({ data: folders }))
		setLoader(false)
	}, [id, store])



	useEffect(() => {
		if (initializeData?.current !== id) {
			setLoader(true)
			handleInitialDataLoad()

			initializeData.current = id
		}
	}, [handleInitialDataLoad, id])


	return (
		<>
			{loader && <ResourceLoader /> || null}
			{!loader && <div className={style.filesAndFolders} ref={scrollRef}>
				{Children.map(children, child => cloneElement(child as React.ReactElement, { lastItemRef }))}
				<RenameModal isOpen={renameModal} data={modalState} />
				<NewfolderModal isOpen={newFolderModal} data={modalState} />
				<DeleteConfirmationModal isOpen={deleteModal} data={modalState} />
			</div>}
		</>
	);
};

export default memo(FileAndFolderStateProvider);
