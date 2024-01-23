"use client";

import { BootstrapMethods } from "@/app/utils/index.utils";
import {
	Children,
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
} from "react";
import style from "../style.module.scss";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/store/actions";

type Props = {
	id: string;
} & PropsWithChildren;

const ModalComponent = ({ id, children }: Props) => {
	const instance = useRef<any>(null);
	const dispatch = useDispatch();

	const getInstance = useCallback(() => {
		const bootstrap = BootstrapMethods.getBootstarp();
		if (!instance.current) {
			instance.current = new bootstrap.Modal(`#${id}`);
			dispatch(openModal({ instance: instance.current, type: id }));
		}
	}, [dispatch, id]);

	useEffect(() => {
		getInstance();
	}, [getInstance]);

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

export default ModalComponent;
