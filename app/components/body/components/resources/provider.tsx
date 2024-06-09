"use client";

import useInfiniteLoop from "@/app/_hooks/useInfiniteLoop";
import { useAppSelector, useAppStore } from "@/app/store";
import { addBulkFiles, addBulkFolder, appendBulkFiles } from "@/app/store/actions";
import { Children, PropsWithChildren, cloneElement, useRef } from "react";
import DeleteConfirmationModal from "../modals/delete";
import NewfolderModal from "../modals/newfolder";
import RenameModal from "../modals/rename";
import { ResourceDatasetType } from "./interfaces/index.interface";
import style from "./style.module.scss";

type Props = {
	data: ResourceDatasetType;
	id?: string | null
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, data, id }: Props) => {
	const initializeData = useRef<string | null | undefined>(null);
	const store = useAppStore()
	const { lastItemRef, scrollRef } = useInfiniteLoop({
		api: appendBulkFiles
	})

	if (initializeData?.current !== id) {
		console.log("Before Initizing", id)
		store.dispatch(addBulkFiles({ data: data?.files }))
		store.dispatch(addBulkFolder({ data: data?.folders }))
		initializeData.current = id
	}

	const {
		renameModal,
		newFolderModal,
		deleteModal,
		data: modalState,
	} = useAppSelector((state) => state.modals);


	return (
		<div className={style.filesAndFolders} ref={scrollRef}>
			{Children.map(children, child => cloneElement(child as React.ReactElement, { lastItemRef }))}
			<RenameModal isOpen={renameModal} data={modalState} />
			<NewfolderModal isOpen={newFolderModal} data={modalState} />
			<DeleteConfirmationModal isOpen={deleteModal} data={modalState} />
		</div>
	);
};

export default FileAndFolderStateProvider;
