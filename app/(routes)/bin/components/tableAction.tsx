"use client";

import MyDropdown from "@/app/components/dropdown";
import { useAppDispatch } from "@/app/store";
import { restoreFromTrashAsync, toggleModal } from "@/app/store/actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";


type Props = {
	data: FolderDataType,
}

const TableAction = ({ data }: Props) => {
	const dispatch = useAppDispatch();


	const handleRestore = async (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		dispatch(
			restoreFromTrashAsync({ resourceId: data?._id })
		);
	}

	const handleDeleteForever = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()
		dispatch(
			toggleModal({
				isOpen: true,
				name: "confirmModal",
				data: {
					id: data?._id,
					type: data?.dataType
				}
			})
		);
	};
	return (
		<>
			<MyDropdown
				handler={{
					render: () => <i className='bi bi-three-dots'></i>,
				}}>
				<MyDropdown.Menu>
					<MyDropdown.List onClick={handleRestore}>
						Restore
					</MyDropdown.List>
					<MyDropdown.List onClick={handleDeleteForever}>
						Delete forever
					</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
		</>
	);
};

export default TableAction;
