import { EffectiveConnectionType } from "@/app/interfaces/index.interface";
import { createReducer } from "@reduxjs/toolkit";
import { addNetworkQuality } from "../actions/network.actions";

const initialState = {
    type: EffectiveConnectionType
};

export type ProfileStateType = typeof initialState;
export default createReducer(initialState, (builder) => {
    builder.addCase(addNetworkQuality, (state, action) => {
        const payload = action?.payload;
        state.type = payload as unknown as typeof EffectiveConnectionType;
        return state;
    })
});
