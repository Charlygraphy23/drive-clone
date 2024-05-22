"use client";

import MyDropdown from "@/app/components/dropdown";
import { toggleModal } from "@/app/store/actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


type Props = {
	data: FolderDataType,
	mutation: UseMutationResult<AxiosResponse<any, any>>
}

const TableAction = ({ data, mutation }: Props) => {
	const dispatch = useDispatch();
	const router = useRouter()


	const handleRestore = async () => {
		try {
			await mutation.mutateAsync(data?._id)
			router.refresh()
		} catch (e) {
			console.log("Failed to restore", e)
		}
	}

	const handleDeleteForever = () => {
		dispatch(
			toggleModal({
				isOpen: true,
				name: "confirmModal",
				data: {
					id: data?._id
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
