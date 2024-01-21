"use client";

import React, { PropsWithChildren } from "react";
import style from "../style.module.scss";

type Props = {
	className?: string;
	modalId: string;
} & PropsWithChildren;

const ModalButton = ({ className, children, modalId }: Props) => {
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

export const ModalCloseButton = ({
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

export default ModalButton;
