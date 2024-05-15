import { ACCESS_ORIGIN, ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { createReducer } from "@reduxjs/toolkit";
import { AccessList, ResourceInfoDataType, clearSelectedFolderId, getFolderInfoAsync, toggleInfo, updateInfoByFolderId } from "../actions/info.actions";

const initialState = {
    loading: false,
    data: {} as Record<string, ResourceInfoDataType>,
    error: "",
    show: false,
    selectedFolderId: ""
};


export type ResourceInfoStateType = typeof initialState;

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getFolderInfoAsync.pending, (state, action) => {
            state.loading = true;
            state.selectedFolderId = action.meta.arg.folderId;
            state.error = "";
            return state
        })

        .addCase(getFolderInfoAsync.fulfilled, (state, action) => {
            const ID = action.payload._id
            state.loading = false;
            state.error = "";
            state.data[ID] = action.payload
            state.selectedFolderId = ID
            return state;
        })
        .addCase(getFolderInfoAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message ?? "";
            return state;
        })
        .addCase(clearSelectedFolderId, (state) => {
            state.selectedFolderId = ""
            return state;
        })
        .addCase(toggleInfo, (state) => {
            state.show = !state.show;
            return state;
        })
        .addCase(updateInfoByFolderId, (state, action) => {
            const { folderId, accesses, userInfo } = action.payload
            const existingAccess = state?.data?.[folderId]?.accessList ?? [];

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
                        resourceId: folderId,
                        userInfo: userInfo,
                    } as AccessList
                    prev.push(newAccess)
                }
                return prev
            }, [])

            state.data = {
                ...state.data,
                [folderId]: {
                    ...state.data[folderId],
                    accessList: updatedAccess
                }
            }

            return state;
        });
});
