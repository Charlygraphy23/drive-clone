import { combineReducers } from "redux";
import filesReducer from "./files.reducers";
import FolderReducer from "./folders.reducers";
import resourceInfo from "./info.reducers";
import ModalReducer from "./modal.reducers";
import notificationReducer from "./notification.reducer";
import profileReducer from "./profile.reduce";



const rootReducer = () =>
	combineReducers({
		folders: FolderReducer,
		modals: ModalReducer,
		files: filesReducer,
		profile: profileReducer,
		notification: notificationReducer,
		resourceInfo: resourceInfo
	});

export default rootReducer;
