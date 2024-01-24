"use client";

import React from "react";
import style from "../../../style.module.scss";
import ModalComponent from "@/app/components/modal";
import { RENAME_MODAL_ID } from "../utils/consts";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import { RootState } from "@/app/store";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import { toggleRenameModal } from "@/app/store/actions";

const RenameFolder = () => {
  const dispatch = useDispatch();
  const { renameModal } = useSelector<RootState, ModalStateType>(
    (state) => state.modals
  );

  const toggleModal = () => {
    dispatch(toggleRenameModal(!renameModal));
  };

  return (
    <ModalComponent
      id={RENAME_MODAL_ID}
      isOpen={renameModal}
      toggle={toggleModal}
    >
      <div className={style.renameFolder}>
        <h5>
          <span>Rename</span>
          <ModalComponent.ButtonClose />
        </h5>

        <input type="text" />

        <div className="d-flex justify-content-end align-items-center mt-4 mb-2">
          <button className="button cancel me-3" onClick={toggleModal}>
            cancel
          </button>
          <button className="button submit">OK</button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default RenameFolder;
