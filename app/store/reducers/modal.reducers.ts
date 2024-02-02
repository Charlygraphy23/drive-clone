import { createReducer } from "@reduxjs/toolkit";
import { toggleNewFolderModal, toggleRenameModal } from "../actions";

export type ModalDataType = null &
  undefined & {} & (
    | {
        fileId: string;
        type: string;
        value: string;
      }
    | {
        folderId: string;
        type: string;
      }
    | { value: string }
  );

const initialState = {
  renameModal: false,
  newFolderModal: false,
  data: {} as ModalDataType,
};

export type ModalStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(toggleRenameModal, (state, action) => {
      const payload = action?.payload;
      state.renameModal = payload?.isOpen;
      state.data = payload.data;

      return state;
    })
    .addCase(toggleNewFolderModal, (state, action) => {
      const payload = action?.payload;
      state.renameModal = payload?.isOpen;
      if (payload?.data) state.data = payload.data;
      return state;
    });
});
