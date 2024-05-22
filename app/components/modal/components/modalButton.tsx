"use client";

import { PropsWithChildren } from "react";
import style from "../style.module.scss";

type Props = {
	className?: string;
	modalId: string;
} & PropsWithChildren;

const ModalButtonComponent = ({ className, children, modalId }: Props) => {
	return (
		<button
			type='button'
			className={`${style.modalButton} ${className}`}
			data-bs-toggle='modal'
			data-bs-target={`#${modalId}`}>
			{children}
		</button>
	);
};

export const ModalCloseButtonComponent = ({
	className,
	children,
}: Pick<Props, "className"> & PropsWithChildren) => {
	return (
		<button
			type='button'
			className={`${style.modalButton} ${className} btn-close`}
			data-bs-dismiss='modal'>
			{children}
		</button>
	);
};

export default ModalButtonComponent;
