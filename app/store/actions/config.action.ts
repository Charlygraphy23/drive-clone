import { createAction } from "@reduxjs/toolkit"

export const toggleSidebar = createAction<{ showSidebar: boolean } | undefined>("toggleSidebar")