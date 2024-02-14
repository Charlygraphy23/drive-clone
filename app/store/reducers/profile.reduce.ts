import { createReducer } from "@reduxjs/toolkit";
import { addProfileData } from "../actions";

export type ProfileDataType = {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
};

const initialState = {
	loading: false,
	data: {
		firstName: "Dipta",
		lastName: "Biswas",
		email: "dipta.biswas@yopmail.com",
		username: "dipat2",
	} as ProfileDataType,
	error: "",
};

export type ProfileStateType = typeof initialState;
export default createReducer(initialState, (builder) => {
	builder.addCase(addProfileData, (state, action) => {
		const payload = action?.payload;
		state.data = payload;
		return state;
	});
});
