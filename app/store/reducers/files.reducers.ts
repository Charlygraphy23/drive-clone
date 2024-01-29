import { createReducer } from "@reduxjs/toolkit";
import { createFile, renameFile } from "../actions";

const initialState = {
	loading: false,
	data: [
		{
			_id: "afsdfsdfs",
			name: "Monthly report July",
			member: "Only You",
			lastModified: new Date().toDateString(),
		},
		{
			_id: "3422",
			name: "Campaign plan 2024",
			member: "4 members",
			lastModified: new Date().toDateString(),
		},

		{
			_id: "afsdfasd34sdfs",
			name: "Quick CV portfolio",
			member: "10 members",
			lastModified: new Date().toDateString(),
		},
		{
			_id: "afss3423dfsdfs",
			name: "Quick CV portfolio",
			member: "10 members",
			lastModified: new Date().toDateString(),
		},
		{
			_id: "afsdfsasdas432dfs",
			name: "Quick CV portfolio",
			member: "10 members",
			lastModified: new Date().toDateString(),
		},
	],
	error: "",
};

export type FileDataType = {
	_id: string;
	name: string;
	lastModified: string;
};
export type FolderStateType = {
	loading: boolean;
	data: FileDataType[];
	error: string;
};
export default createReducer(initialState, (builder) => {
	builder
		.addCase(createFile, (state, action) => {
			const payload = action?.payload;

			state.data.push({
				_id: Date.now().toString(),
				name: payload?.name,
				member: "",
				lastModified: new Date().toLocaleDateString(),
			});
			return state;
		})
		.addCase(renameFile, (state, action) => {
			const payload = action?.payload;

			state.data.forEach((file) => {
				if (file?._id === payload?.fileId) {
					file.name = payload?.name;
				}
			});
			return state;
		});
});
