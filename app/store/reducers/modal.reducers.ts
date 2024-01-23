import { createReducer } from "@reduxjs/toolkit";
import { openModal } from "../actions";

const initialState = {} as Record<string, any>;

export default createReducer(initialState, (builder) => {
	builder.addCase(openModal, (state, action) => {
		const payload = action?.payload;
		state[payload.type] = payload.instance;
		return state;
	});
});
