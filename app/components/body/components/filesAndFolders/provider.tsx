"use client";

import { RootState } from "@/app/store";
import { addBulkFiles, addBulkFolder } from "@/app/store/actions";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { Fragment, PropsWithChildren, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
	} = useSelector<RootState, ModalStateType>((state) => state.modals);

	const dispatch = useDispatch();
	const ref = useRef(false);

	useEffect(() => {
		if (ref?.current) return;
		ref.current = true;

		dispatch(addBulkFiles({ data: data?.files }));
		dispatch(addBulkFolder({ data: data?.folders }));
	}, [data?.files, data?.folders, dispatch]);

	return (
		<Fragment>
			{children}
			<RenameModal isOpen={renameModal} data={modalState} />
			<NewfolderModal isOpen={newFolderModal} data={modalState} />
		</Fragment>
	);
};

export default FileAndFolderStateProvider;
