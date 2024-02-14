import { combineReducers } from "redux";
import FolderReducer from "./folders.reducers";
import ModalReducer from "./modal.reducers";
import filesReducer from "./files.reducers";
import profileReducer from "./profile.reduce";

const rootReducer = () =>
	combineReducers({
		folders: FolderReducer,
		modals: ModalReducer,
		files: filesReducer,
		profile: profileReducer,
	});

export default rootReducer;
