"use client";

import { BootstrapMethods } from "@/app/utils/index.utils";
import {
	PropsWithChildren,
	memo,
	useCallback,
	useEffect,
	useRef,
} from "react";
import ModalButtonComponent, { ModalCloseButtonComponent } from "./components/modalButton";
import ModalComponent from "./components/modalComponent";
import { ModalSize } from "./interfaces/index.interface";

type Props = {
	id: string;
	isOpen?: boolean;
	toggle?: (_isOpen?: boolean) => void;
	centered?: boolean
	size?: ModalSize,
	blockHide?: boolean
} & PropsWithChildren;

const Modal = (props: Props) => {
	const { id, isOpen, toggle, children, centered, size, blockHide } = props;
	const instance = useRef<any>(null);

	const getInstance = useCallback(() => {
		if (!instance.current) {
			const bootstrap = BootstrapMethods.getBootstarp();
			instance.current = new bootstrap.Modal(`#${id}`);
		}
	}, [id]);

	useEffect(() => {
		getInstance();

		return () => {

			if (instance.current) {
				instance.current.hide()
				if (toggle && isOpen) toggle(false);
				// instance.current.dispose()
				// instance.current = null
			}
		}
	}, [getInstance, isOpen, toggle]);

	useEffect(() => {
		if (!instance?.current) return;

		isOpen ? instance?.current?.show() : instance?.current?.hide();
	}, [isOpen]);


	useEffect(() => {
		if (!instance?.current) return;

		const handleHidden = () => {
			if (toggle && isOpen) toggle(false);
		};

		const modal = document.getElementById(id);
		modal?.addEventListener("hidden.bs.modal", handleHidden)

		// modals.forEach((modal) =>
		// 	modal?.addEventListener("hidden.bs.modal", handleHidden)
		// );

		return () => {
			const modal = document.getElementById(id);
			modal?.removeEventListener("hidden.bs.modal", handleHidden)

		};
	}, [toggle, isOpen, id]);

	return (
		<ModalComponent centered={centered} isOpen={isOpen} id={id} size={size} blockHide={blockHide}>
			{children}
		</ModalComponent>
	);
};


export const ModalButton = ModalButtonComponent;
export const ButtonClose = ModalCloseButtonComponent;

export default memo(Modal);
