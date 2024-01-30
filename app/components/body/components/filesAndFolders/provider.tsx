"use client";

import { addBulkFiles, addBulkFolder } from "@/app/store/actions";
import React, { Fragment, PropsWithChildren, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenameModal from "../modals/rename";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { RootState } from "@/app/store";

type Props = {
	data: any;
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, data }: Props) => {
	const { renameModal, data: modalState } = useSelector<
		RootState,
		ModalStateType
	>((state) => state.modals);

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
		</Fragment>
	);
};

export default FileAndFolderStateProvider;
