import { createReducer, createAction } from "@reduxjs/toolkit";
import { addFolder } from "../actions";

const initialState = {
	loading: false,
	data: [
		{
			_id: "asdkj21233123",
			name: "Dummy",
			path: "dummy",
		},
		{
			_id: "sad312e231",
			name: "my folder",
			path: "myfolder",
		},
		{
			_id: "sad312asdde231",
			name: "my  dummy folder",
			path: "myfolder",
		},

		{
			_id: "333adsdadasd",
			name: "my  dummy folder",
			path: "myfolder",
		},

		{
			_id: "asd324234",
			name: "my  dummy folder",
			path: "myfolder",
		},
	],
	error: "",
};

export type FolderDataType = {
	_id: string;
	name: string;
	path?: string;
};
export type FolderStateType = {
	loading: boolean;
	data: FolderDataType[];
	error: string;
};
export default createReducer(initialState, (builder) => {
	builder.addCase(addFolder, (state, action) => {
		state.data.push({
			_id: Date.now().toString(),
			name: action.payload.name,
			path: "myFolder",
		});
		return state;
	});
});
