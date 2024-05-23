import { createReducer } from "@reduxjs/toolkit";
import { addProfileData, changeProfileData } from "../actions";

export type ProfileDataType = {
	firstName: string;
	lastName: string;
	email: string;
};

const initialState = {
	loading: false,
	data: {
		firstName: "",
		lastName: "",
		email: "",
	} as ProfileDataType,
	error: "",
};

export type ProfileStateType = typeof initialState;
export default createReducer(initialState, (builder) => {
	builder.addCase(addProfileData, (state, action) => {
		const payload = action?.payload;
		state.data = payload;
		return state;
	}).addCase(changeProfileData, (state, action) => {
		const payload = action?.payload;
		state.data = {
			...state.data,
			...payload
		}
		return state;
	});
});
