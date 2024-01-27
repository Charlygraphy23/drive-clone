import { createReducer } from "@reduxjs/toolkit";
import { createFile } from "../actions";

const initialState = {
	loading: false,
	data: [
		{
			name: "Monthly report July",
			member: "Only You",
			lastModified: new Date().toLocaleString(),
		},
		{
			name: "Campaign plan 2024",
			member: "4 members",
			lastModified: new Date().toLocaleString(),
		},

		{
			name: "Quick CV portfolio",
			member: "10 members",
			lastModified: new Date().toLocaleString(),
		},
		{
			name: "Quick CV portfolio",
			member: "10 members",
			lastModified: new Date().toLocaleString(),
		},
		{
			name: "Quick CV portfolio",
			member: "10 members",
			lastModified: new Date().toLocaleString(),
		},
	],
	error: "",
};

export type FileDataType = {
	name: string;
	lastModified: string;
};
export type FolderStateType = {
	loading: boolean;
	data: FileDataType[];
	error: string;
};
export default createReducer(initialState, (builder) => {
	builder.addCase(createFile, (state, action) => {
		const payload = action?.payload;

		state.data.push({
			name: payload?.name,
			member: "",
			lastModified: new Date().toLocaleDateString(),
		});
		return state;
	});
});
