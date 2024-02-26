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
			<div className={` modal-dialog ${style.dialog} ${centered ? 'modal-dialog-centered' : ''}`}>
				<div className={` modal-content ${style.content}`}>
					<div className={` modal-body ${style.body}`}>
						{Children.count(children) ? children : "Provide Node children"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalComponent;
