"use client";

import React, {
  Children,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import style from "./style.module.scss";
import ModalButton, { ModalCloseButton } from "./components/modalButton";
import { BootstrapMethods } from "@/app/utils/index.utils";

export type ModalProps = {
  id: string;
} & PropsWithChildren;

const ModalComponent = ({ id, children }: ModalProps) => {
  const instance = useRef<any>(null);

  const getInstance = useCallback(() => {
    const bootstrap = BootstrapMethods.getBootstarp();
    if (!instance.current) instance.current = new bootstrap.Modal(`#${id}`);
  }, [id]);

  useEffect(() => {
    getInstance();
  }, [getInstance]);

  


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

ModalComponent.Button = ModalButton;
ModalComponent.ButtonClose = ModalCloseButton;

export default ModalComponent;
