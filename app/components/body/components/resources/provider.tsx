"use client";

import { useAppSelector, useAppStore } from "@/app/store";
import { addBulkFiles, addBulkFolder } from "@/app/store/actions";
import { Fragment, PropsWithChildren, useRef } from "react";
import DeleteConfirmationModal from "../modals/delete";
import NewfolderModal from "../modals/newfolder";
import RenameModal from "../modals/rename";
import { FileAndFolderDatasetType } from "./interfaces/index.interface";

type Props = {
	data: FileAndFolderDatasetType;
	id?: string | null
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, data, id }: Props) => {
	const initializeData = useRef<string | null | undefined>(null);
	const store = useAppStore()

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
		<Fragment>
			{children}
			<RenameModal isOpen={renameModal} data={modalState} />
			<NewfolderModal isOpen={newFolderModal} data={modalState} />
			<DeleteConfirmationModal isOpen={deleteModal} data={modalState} />
		</Fragment>
	);
};

export default FileAndFolderStateProvider;
