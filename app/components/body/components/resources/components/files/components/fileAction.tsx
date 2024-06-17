"use client";

import MyDropdown from "@/app/components/dropdown";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { toggleModal } from "@/app/store/actions";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import { useDispatch } from "react-redux";

type Props = {
	data: FileDataType;
	isShared?: boolean;
};

const FileAction = ({ data, isShared }: Props) => {
	const dispatch = useDispatch();
	const access = data?.access

	const handleRenameClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		dispatch(
			toggleModal({
				isOpen: true,
				data: {
					id: data?._id,
					type: DATA_TYPE.FILE,
					value: data?.name,
				},
				name: "renameModal",
			})
		);
	};

	const handleRemoveAccess = () => {
		dispatch(
			toggleModal({
				isOpen: true,
				data: {
					id: data?._id,
					type: DATA_TYPE.FILE,
					value: data?.access?._id
				},
				name: "confirmModal",
			})
		);
	}

	const handleTrash = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		if (isShared) return handleRemoveAccess()


		dispatch(
			toggleModal({
				isOpen: true,
				data: {
					id: data?._id,
					type: DATA_TYPE.FILE,
					value: data.name ?? ""
				},
				name: "deleteModal",
			})
		);
	}

	return (
		<MyDropdown
			handler={{
				render: () => <i id="more-option-file" className='bi bi-three-dots' onClick={e => {
					e.preventDefault()
					e.stopPropagation()
				}}></i>,
			}}>
			<MyDropdown.Menu>
				{(!isShared || (isShared && access.accessType === ACCESS_TYPE.WRITE)) && <>
					<MyDropdown.List onClick={handleRenameClick}>Rename</MyDropdown.List>
					<MyDropdown.List divider></MyDropdown.List>
				</> || <></>}
				<MyDropdown.List onClick={handleTrash}>{isShared ? <span> Remove </span> : <span> Move to trash </span>}</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default FileAction;
