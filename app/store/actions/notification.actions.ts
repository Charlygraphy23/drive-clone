import { createAction } from "@reduxjs/toolkit";
import { NotificationDataType } from "../reducers/notification.reducer";

type PushNotificationType = Omit<NotificationDataType, "timestamp">

export const pushNotification = createAction<PushNotificationType>("pushNotification")
export const clearNotificationByIndex = createAction<number>("clearNotificationByIndex")
export const popNotification = createAction("popNotification")

