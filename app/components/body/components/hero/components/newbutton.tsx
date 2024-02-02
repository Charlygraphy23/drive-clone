"use client"

import MyDropdown from "@/app/components/dropdown";
import React from "react";
import style from "../style.module.scss";
import { useDispatch } from "react-redux";
import { toggleNewFolderModal } from "@/app/store/actions";

const NewButtonComponent = () => {

	const dispatch = useDispatch()

	const handleNewFolderClick = () => {
		dispatch(toggleNewFolderModal({
			isOpen: true,
		}))

	}

	return (
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
				<MyDropdown.List onClick={handleNewFolderClick}>New Folder</MyDropdown.List>
				<MyDropdown.List>New File</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default NewButtonComponent;
