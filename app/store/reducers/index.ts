import { combineReducers } from "redux";
import FolderReducer from "./folders.reducers";

const rootReducer = () =>
	combineReducers({
		folders: FolderReducer,
	});

export default rootReducer;
