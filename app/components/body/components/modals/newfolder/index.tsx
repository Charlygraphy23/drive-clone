"use client";

import React, { ChangeEvent, FormEvent, memo, useState } from "react";
import style from "./style.module.scss";
import ModalComponent from "@/app/components/modal";
import { addFolder, toggleRenameModal } from "@/app/store/actions";
import { useDispatch } from "react-redux";
import { NEW_FOLDER_MODAL_ID } from "@/app/config/const";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";

type Props = {
  isOpen: boolean;
  data: ModalDataType;
};

const NewFolderModal = ({ isOpen, data }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");

  const toggleModal = (isOpen?: boolean) => {
    dispatch(
      toggleRenameModal({
        isOpen: !!isOpen,
      })
    );
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleModalSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name) return;

    dispatch(addFolder({ name }));

    toggleModal(false);
    setName("");
  };

  return (
    <ModalComponent
      id={NEW_FOLDER_MODAL_ID}
      isOpen={isOpen}
      toggle={toggleModal}
    >
      <form onSubmit={handleModalSubmit} className={style.newfolderModal}>
        <h5>
          <span>New Folder</span>
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

export default memo(NewFolderModal);
