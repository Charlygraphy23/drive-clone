"use client";

import MyDropdown from "@/app/components/dropdown";
import { toggleRenameModal } from "@/app/store/actions";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
	data: FileDataType;
};

const FileAction = ({ data }: Props) => {
	const dispatch = useDispatch();

	const handleRenameClick = () => {
		dispatch(
			toggleRenameModal({
				isOpen: true,
				data: {
					fileId: data?._id,
					type: "file",
					value: data?.name,
				},
			})
		);
	};

	return (
		<MyDropdown
			handler={{
				render: () => <i className='bi bi-three-dots'></i>,
			}}>
			<MyDropdown.Menu>
				<MyDropdown.List onClick={handleRenameClick}>Rename</MyDropdown.List>
				<MyDropdown.List divider></MyDropdown.List>
				<MyDropdown.List>Move to trash</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default FileAction;
