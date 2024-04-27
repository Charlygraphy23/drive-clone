/* eslint-disable no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";
import { clearNotificationByIndex, popNotification, pushNotification } from "../actions/notification.actions";

export enum NotificationType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
}

export type NotificationDataType = {
    timestamp: number,
    message?: string,
    type: NotificationType
}

const initialState = {
    notifications: [] as NotificationDataType[]
};

export type NotificationStateType = typeof initialState

export default createReducer(initialState, (builder) => {
    builder.addCase(pushNotification, (state, action) => {
        const payload = action?.payload;
        state.notifications.push({
            ...payload,
            timestamp: Date.now()
        })
        return state;
    });

    builder.addCase(clearNotificationByIndex, (state, action) => {
        const index = action?.payload;
        state.notifications = state.notifications.filter((val, i) => i !== index)
        return state;
    });

    builder.addCase(popNotification, (state) => {
        state.notifications.unshift()
        return state;
    });
});
