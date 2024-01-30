"use client";

import { Children, PropsWithChildren } from "react";
import style from "../style.module.scss";

type Props = {
	id: string;
	isOpen?: boolean;
} & PropsWithChildren;

const ModalComponent = ({ id, children }: Props) => {
	return (
		<div id={id} className={`${style.modal} modal fade`} tabIndex={-1}>
			<div className={`${style.dialog} modal-dialog modal-dialog-centered`}>
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
