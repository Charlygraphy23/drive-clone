import { createReducer } from "@reduxjs/toolkit";
import { activeErrorAlert, activeSuccessAlert, activeWarningAlert, disableAlert } from "../actions";


export enum ALERT_MODAL_TYPE {
    // eslint-disable-next-line no-unused-vars
    SUCCESS = "success",
    // eslint-disable-next-line no-unused-vars
    ERROR = "error",
    // eslint-disable-next-line no-unused-vars
    WARNING = "warning"
}


const initialState = {
    isOpen: false,
    type: ALERT_MODAL_TYPE.SUCCESS,
    message: ""
};


export type AlertModalStateType = {
    isOpen: boolean,
    type: ALERT_MODAL_TYPE,
    message?: string
};
export default createReducer(initialState, (builder) => {
    builder
        .addCase(activeSuccessAlert, (state) => {
            state.isOpen = true
            state.message = "Great! Success"
            state.type = ALERT_MODAL_TYPE.SUCCESS
            return state;
        })
        .addCase(activeErrorAlert, (state, action) => {
            const payload = action?.payload
            state.isOpen = true
            state.message = payload?.message ?? "Opps! Error"
            state.type = ALERT_MODAL_TYPE.ERROR
            return state;
        })
        .addCase(activeWarningAlert, (state, action) => {
            const payload = action?.payload
            state.isOpen = true
            state.message = payload?.message ?? "Something went wrong!"
            state.type = ALERT_MODAL_TYPE.WARNING
            return state;
        })
        .addCase(disableAlert, () => {
            return initialState;
        })
});
