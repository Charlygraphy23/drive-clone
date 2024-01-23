"use client";

import React from "react";
import style from "../../../style.module.scss";
import ModalComponent from "@/app/components/modal";
import { RENAME_MODAL_ID } from "../utils/consts";
import { BootstrapMethods } from "@/app/utils/index.utils";

const RenameFolder = () => {

	const handleCancel = () => {
		BootstrapMethods.toggle(RENAME_MODAL_ID)
	}
 
  return (
    <ModalComponent id={RENAME_MODAL_ID}>
      <div className={style.renameFolder}>
        <h5>
          <span>Rename</span>
          <ModalComponent.ButtonClose />
        </h5>

        <input type="text" />

        <div className="d-flex justify-content-end align-items-center mt-4 mb-2">
          <button className="button cancel me-3" onClick={handleCancel}>
            cancel
          </button>
          <button className="button submit">OK</button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default RenameFolder;
