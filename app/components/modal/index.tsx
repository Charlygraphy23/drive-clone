"use client";

import React, {
	Children,
	PropsWithChildren,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import style from "./style.module.scss";
import ModalButton, { ModalCloseButton } from "./components/modalButton";
import { Modal } from "bootstrap";

type Props = {
	id: string;
	isOpen: boolean;
	toggle: (isOpen?: boolean) => void;
} & PropsWithChildren;

const ModalComponent = ({ id, children }: Props) => {
	// const instance = useRef(new window.bootstrap.Modal(`#${id}`));

	// const handleClick = () => {
	// 	console.log("handleClick", window.bootstrap);
	// 	const myModal = new window.bootstrap.Modal(
	// 		document.getElementById("rename_modal"),
	// 		{
	// 			keyboard: false,
	// 		}
	// 	);

	// 	myModal.hide();
	// };

	const getInstance = () => {
		console.log("getInstance", Modal);
	};

	useEffect(() => {
		getInstance();
	}, []);

	return (
		<div id={id} className={`${style.modal} modal fade`} tabIndex={-1}>
			<div
				className={`${style.modalDialog} modal-dialog modal-dialog-centered`}>
				<div className={`${style.modalContent} modal-content`}>
					<div className='modal-body'>
						{Children.count(children) ? children : "Provide Node children"}
					</div>
				</div>
			</div>
		</div>
	);
};

ModalComponent.Button = ModalButton;
ModalComponent.ButtonClose = ModalCloseButton;
ModalComponent.getInstance = (id: string) => {
	return new window.bootstrap.Modal(`#${id}`);
};

export default ModalComponent;
