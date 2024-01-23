import { combineReducers } from "redux";
import FolderReducer from "./folders.reducers";
import ModalReducer from "./modal.reducers";

const rootReducer = () =>
	combineReducers({
		folders: FolderReducer,
		modals: ModalReducer,
	});

export default rootReducer;
