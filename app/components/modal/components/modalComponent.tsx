"use client";

import { Children, PropsWithChildren, useMemo } from "react";
import { ModalSize } from "../interfaces/index.interface";
import style from "../style.module.scss";
import { getModalSize } from "../utils";

type Props = {
	id: string;
	isOpen?: boolean;
	centered?: boolean
	size?: ModalSize
} & PropsWithChildren;

const ModalComponent = ({ id, children, centered = true, size }: Props) => {
	const modalSize = useMemo(() => getModalSize(size), [size])

	return (
		<div id={id} className={`${style.modal} ${modalSize} modal fade`} tabIndex={-1}>
			<div className={`${style.dialog} modal-dialog ${centered ? 'modal-dialog-centered' : ''}`}>
				<div className={`${style.content} modal-content`}>
					<div className={`${style.body} modal-body`}>
						{Children.count(children) ? children : "Provide Node children"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalComponent;
