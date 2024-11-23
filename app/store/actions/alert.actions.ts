import { createAction } from "@reduxjs/toolkit"

export const activeSuccessAlert = createAction<{ message?: string } | undefined>("activeSuccessAlert")
export const activeErrorAlert = createAction<{ message: string } | undefined>("activeErrorAlert")
export const activeWarningAlert = createAction<{ message: string } | undefined>("activeWarningAlert")
export const disableAlert = createAction("disableAlert")


