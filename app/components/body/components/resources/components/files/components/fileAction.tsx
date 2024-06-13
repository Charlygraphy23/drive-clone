"use client";

import MyDropdown from "@/app/components/dropdown";
import { DATA_TYPE } from "@/app/lib/database/interfaces/files.interfaces";
import { toggleModal } from "@/app/store/actions";
import { FileDataType } from "@/app/store/reducers/files.reducers";
import { useDispatch } from "react-redux";

type Props = {
	data: FileDataType;
};

const FileAction = ({ data }: Props) => {
	const dispatch = useDispatch();

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

	const handleTrash = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

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
				<MyDropdown.List onClick={handleRenameClick}>Rename</MyDropdown.List>
				<MyDropdown.List divider></MyDropdown.List>
				<MyDropdown.List onClick={handleTrash}>Move to trash</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default FileAction;
