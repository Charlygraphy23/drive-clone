import { combineReducers } from "redux";
import FolderReducer from "./folders.reducers";
import ModalReducer from "./modal.reducers";
import filesReducers from "./files.reducers";

const rootReducer = () =>
	combineReducers({
		folders: FolderReducer,
		modals: ModalReducer,
		files: filesReducers
	});

export default rootReducer;
