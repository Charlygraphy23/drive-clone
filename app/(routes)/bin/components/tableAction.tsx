"use client";

import MyDropdown from "@/app/components/dropdown";
import { toggleModal } from "@/app/store/actions";
import { UseMutateFunction } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

type Props = {
	restoreApi: UseMutateFunction;
};

const TableAction = ({ restoreApi }: Props) => {
	const dispatch = useDispatch();
	const handleDeleteForever = () => {
		dispatch(
			toggleModal({
				isOpen: true,
				name: "confirmModal",
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
					<MyDropdown.List onClick={() => restoreApi()}>
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
