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

	const handleRenameClick = () => {
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

	const handleTrash = () => {

	}

	return (
		<MyDropdown
			handler={{
				render: () => <i className='bi bi-three-dots'></i>,
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
