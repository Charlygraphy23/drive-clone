"use client";

import { fetchFileData, fetchFolderData } from "@/app/_actions/resource";
import { FILE_LIMIT } from "@/app/_config/const";
import useInfiniteLoop from "@/app/_hooks/useInfiniteLoop";
import ResourceLoader from "@/app/components/loader/resourceLoader";
import ConfirmationModalComponent from "@/app/components/modal/modals/confirmation";
import PreviewFiles from "@/app/components/preview";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { useAppDispatch, useAppSelector, useAppStore } from "@/app/store";
import { addBulkFiles, addBulkFolder, appendBulkFiles, removeAccessFromFileAsync, removeAccessFromFolderAsync, toggleModal } from "@/app/store/actions";
import { clearSelectedFolderId } from "@/app/store/actions/info.actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import { Children, PropsWithChildren, cloneElement, memo, useCallback, useEffect, useRef, useState } from "react";
import DeleteConfirmationModal from "../modals/delete";
import NewfolderModal from "../modals/newfolder";
import RenameModal from "../modals/rename";
import style from "./style.module.scss";

type Props = {
	id?: string | null
	user?: Session["user"]
	isShared?: boolean
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, id, user, isShared }: Props) => {
	const searchParams = useSearchParams()
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
		hasNext,
		limit: FILE_LIMIT
	})
	const dispatch = useAppDispatch()
	const [loader, setLoader] = useState(true)
	const [isRemoving, setIsRemoving] = useState(false)
	const fileIdFromSearch = searchParams.get('file')


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

	const handleInitialDataLoad = useCallback(async () => {
		const [folders, filesData] = await Promise.all([
			fetchFolderData({
				folderId: id ?? "",
				userId: String(user?._id),
				shared: isShared ? "only" : "off"
			}),
			fetchFileData({
				folderId: id ?? "",
				userId: String(user?._id),
				shared: isShared ? "only" : "off",
				fileId: fileIdFromSearch ?? ""
			})
		])
		store.dispatch(addBulkFiles({ data: filesData?.resources, next: filesData?.next }))
		store.dispatch(addBulkFolder({ data: folders }))
		setLoader(false)
	}, [id, isShared, store, user?._id])

	const handleRemoveAccess = (toggle: () => void, payload: ModalDataType) => {
		if (isRemoving) return;

		const { id, type, value } = payload

		setIsRemoving(true)

		if (type === DATA_TYPE.FILE) {
			dispatch(removeAccessFromFileAsync({ resourceId: id, accessId: value ?? "" })).then(() => {
				setIsRemoving(false)
				toggle()
			}).catch(_err => {
				setIsRemoving(false)
			})
		} else {
			dispatch(removeAccessFromFolderAsync({ resourceId: id, accessId: value ?? "" })).then(() => {
				setIsRemoving(false)
				toggle()
			}).catch(_err => {
				setIsRemoving(false)
			})
		}

	}


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
				{isShared && <ConfirmationModalComponent
					onSubmit={handleRemoveAccess}
					message='Do you want to remove?'
					isLoading={isRemoving}
				/>}
				<PreviewFiles />
			</div>}
		</>
	);
};

export default memo(FileAndFolderStateProvider);
