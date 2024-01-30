"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "../../../style.module.scss";
import ModalComponent from "@/app/components/modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { ModalStateType } from "@/app/store/reducers/modal.reducers";
import {
  renameFile,
  renameFolder,
  toggleRenameModal,
} from "@/app/store/actions";
import { RENAME_MODAL_ID } from "../../filesAndFolders/components/folders/utils/consts";

const RenameModal = () => {
  const dispatch = useDispatch();
  const { renameModal, data } = useSelector<RootState, ModalStateType>(
    (state) => state.modals
  );
  const [name, setName] = useState(data?.value);

  const toggleModal = (isOpen?: boolean) => {
    dispatch(
      toggleRenameModal({
        isOpen: !!isOpen,
      })
    );
    setName(data?.value);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleModalSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name) return;

    if (data?.type === "file") {
      dispatch(renameFile({ fileId: data?.fileId, name }));
    } else dispatch(renameFolder({ folderId: data?.folderId, name }));

    toggleModal(false);
    setName("");
  };

  useEffect(() => {
    setName(data?.value);
  }, [data?.value]);

  return (
    <ModalComponent
      id={RENAME_MODAL_ID}
      isOpen={renameModal}
      toggle={toggleModal}
    >
      <form onSubmit={handleModalSubmit} className={style.renameModal}>
        <h5>
          <span>Rename</span>
          <ModalComponent.ButtonClose />
        </h5>

        <input type="text" value={name} onChange={onChange} />

        <div className="d-flex justify-content-end align-items-center mt-4 mb-2">
          <button
            type="button"
            className="button cancel me-3"
            onClick={() => toggleModal(false)}
          >
            cancel
          </button>
          <button type="submit" className="button submit">
            OK
          </button>
        </div>
      </form>
    </ModalComponent>
  );
};

export default RenameModal;
