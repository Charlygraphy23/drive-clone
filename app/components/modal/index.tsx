"use client";

import React, { PropsWithChildren } from "react";
import ModalButton, { ModalCloseButton } from "./components/modalButton";
import ModalComponent from "./components/modalComponent";

type Props = {
	id: string;
	isOpen?: boolean;
	toggle?: (isOpen?: boolean) => void;
} & PropsWithChildren;

const Modal = (props: Props) => {
	return <ModalComponent {...props} />;
};

Modal.Button = ModalButton;
Modal.ButtonClose = ModalCloseButton;

export default Modal;
