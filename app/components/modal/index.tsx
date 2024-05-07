"use client";

import { BootstrapMethods } from "@/app/utils/index.utils";
import {
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
} from "react";
import ModalButton, { ModalCloseButton } from "./components/modalButton";
import ModalComponent from "./components/modalComponent";
import { ModalSize } from "./interfaces/index.interface";

type Props = {
	id: string;
	isOpen?: boolean;
	toggle?: (_isOpen?: boolean) => void;
	centered?: boolean
	size?: ModalSize
} & PropsWithChildren;

const Modal = (props: Props) => {
	const { id, isOpen, toggle, children, centered, size } = props;
	const instance = useRef<any>(null);

	const getInstance = useCallback(() => {
		if (!instance.current) {
			const bootstrap = BootstrapMethods.getBootstarp();
			instance.current = new bootstrap.Modal(`#${id}`);
		}
	}, [id]);

	useEffect(() => {
		getInstance();
	}, [getInstance]);

	useEffect(() => {
		if (!instance?.current) return;

		isOpen ? instance?.current?.show() : instance?.current?.hide();

	}, [isOpen]);

	useEffect(() => {
		if (!instance?.current) return;

		const handleHidden = () => {
			if (toggle && isOpen) toggle(false);
		};

		const modals = document.querySelectorAll(".modal");

		modals.forEach((modal) =>
			modal?.addEventListener("hidden.bs.modal", handleHidden)
		);

		return () => {
			modals.forEach((modal) =>
				modal?.removeEventListener("hidden.bs.modal", handleHidden)
			);
		};
	}, [isOpen, toggle]);

	return (
		<ModalComponent centered={centered} isOpen={isOpen} id={id} size={size}>
			{children}
		</ModalComponent>
	);
};

Modal.Button = ModalButton;
Modal.ButtonClose = ModalCloseButton;

export default Modal;
