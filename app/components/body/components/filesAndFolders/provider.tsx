"use client";

import { useAppSelector, useAppStore } from "@/app/store";
import { addBulkFiles, addBulkFolder } from "@/app/store/actions";
import { Fragment, PropsWithChildren, useRef } from "react";
import NewfolderModal from "../modals/newfolder";
import RenameModal from "../modals/rename";
import { FileAndFolderDatasetType } from "./interfaces/index.interface";

type Props = {
	data: FileAndFolderDatasetType;
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, data }: Props) => {
	const {
		renameModal,
		newFolderModal,
		data: modalState,
	} = useAppSelector((state) => state.modals);

	const initializeData = useRef<boolean>(false);
	const store = useAppStore()

	if (!initializeData?.current) {
		store.dispatch(addBulkFiles({ data: data?.files }))
		store.dispatch(addBulkFolder({ data: data?.folders }))
		initializeData["current"] = true
	}

	return (
		<Fragment>
			{children}
			<RenameModal isOpen={renameModal} data={modalState} />
			<NewfolderModal isOpen={newFolderModal} data={modalState} />
		</Fragment>
	);
};

export default FileAndFolderStateProvider;
