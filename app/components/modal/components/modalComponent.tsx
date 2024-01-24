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

type Props = {
  id: string;
  isOpen?: boolean;
  toggle?: (isOpen?: boolean) => void;
} & PropsWithChildren;

const ModalComponent = ({ id, children, isOpen, toggle }: Props) => {
  const instance = useRef<any>(null);

  const getInstance = useCallback(() => {
    const bootstrap = BootstrapMethods.getBootstarp();
    if (!instance.current) instance.current = new bootstrap.Modal(`#${id}`);
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
	  if(toggle) toggle()
    };
	
	const modal = document.querySelector(".modal")

    modal?.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      modal?.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, [toggle]);

  return (
    <div id={id} className={`${style.modal} modal fade`} tabIndex={-1}>
      <div
        className={`${style.modalDialog} modal-dialog modal-dialog-centered`}
      >
        <div className={`${style.modalContent} modal-content`}>
          <div className="modal-body">
            {Children.count(children) ? children : "Provide Node children"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
