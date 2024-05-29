"use client";

import MyDropdown from "@/app/components/dropdown";
import { useAppSelector } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { useDispatch } from "react-redux";
import style from "../style.module.scss";
import FileUploadModal from "./fileUploadModal";

const NewButtonComponent = () => {
	const {
		fileUpload,
		data: modalState,
	} = useAppSelector((state) => state.modals);
	const dispatch = useDispatch();

	const handleNewFolderClick = () => {
		dispatch(
			toggleModal({
				isOpen: true,
				name: "newFolderModal",
			})
		);
	};

	const handleFileUpload = () => {
		dispatch(
			toggleModal({
				isOpen: true,
				name: "fileUpload",
			})
		);
	};

	return (
		<>
			<MyDropdown
				handler={{
					className: style.newButtonHandler,
					render: () => (
						<button type='button'>
							<i className='bi bi-plus-circle'></i>
							<span>New</span>
						</button>
					),
				}}>
				<MyDropdown.Menu>
					<MyDropdown.List onClick={handleNewFolderClick}>
						New Folder
					</MyDropdown.List>
					<MyDropdown.List onClick={handleFileUpload}>New File</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
			<FileUploadModal isOpen={fileUpload} data={modalState} />
		</>
	);
};

export default NewButtonComponent;
