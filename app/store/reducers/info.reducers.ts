import { ACCESS_ORIGIN, ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { createReducer } from "@reduxjs/toolkit";
import { AccessList, ResourceInfoDataType, clearSelectedFolderId, getResourceInfoAsync, invalidateCache, invalidateCacheById, toggleInfo, updateInfo, updateInfoByFolderId } from "../actions/info.actions";

const initialState = {
    loading: false,
    data: {} as Record<string, ResourceInfoDataType>,
    error: "",
    show: false,
    selectedResourceId: "",
};


export type ResourceInfoStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getResourceInfoAsync.pending, (state, action) => {
            state.loading = true;
            state.selectedResourceId = action.meta.arg.resourceId;
            state.error = "";
            return state
        })

        .addCase(getResourceInfoAsync.fulfilled, (state, action) => {
            const ID = action.payload._id
            state.loading = false;
            state.error = "";
            state.data[ID] = action.payload
            state.selectedResourceId = ID
            return state;
        })
        .addCase(getResourceInfoAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "";
            return state;
        })
        .addCase(clearSelectedFolderId, (state) => {
            state.selectedResourceId = ""
            return state;
        })
        .addCase(toggleInfo, (state) => {
            state.show = !state.show;
            return state;
        })
        .addCase(invalidateCache, (state) => {
            state.data = {} as Record<string, ResourceInfoDataType>
            return state;
        })
        .addCase(invalidateCacheById, (state, action) => {
            const payload = action.payload
            delete state.data[payload]
            return state;
        })
        .addCase(updateInfo, (state, action) => {
            const resourceId = action.payload.id

            if (state?.data?.[resourceId]) {
                state.data[resourceId] = {
                    ...state.data[resourceId],
                    ...action.payload.data
                }
            }
            return state;
        })
        .addCase(updateInfoByFolderId, (state, action) => {
            const { resourceId, accesses } = action.payload
            const existingAccess = state?.data?.[resourceId]?.accessList ?? [];

            const updatedAccess = accesses.reduce<AccessList[]>((prev, curr) => {
                const hasAccess = existingAccess?.find((access) => access?._id === curr?.accessId)

                if (hasAccess) {
                    prev.push({
                        ...hasAccess,
                        accessType: curr?.accessType as ACCESS_TYPE
                    })
                }

                else {
                    const newAccess = {
                        accessType: curr.accessType,
                        origin: ACCESS_ORIGIN.SELF,
                        resourceId,
                        userInfo: curr?.userInfo,
                    } as AccessList
                    prev.push(newAccess)
                }
                return prev
            }, [])

            state.data = {
                [resourceId]: {
                    ...state.data[resourceId],
                    accessList: updatedAccess
                }
            }

            return state;
        });
});
