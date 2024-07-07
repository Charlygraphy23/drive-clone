import { combineReducers } from "redux";
import binReducer from "./bin.reducer";
import filesReducer from "./files.reducers";
import FolderReducer from "./folders.reducers";
import resourceInfo from "./info.reducers";
import ModalReducer from "./modal.reducers";
import networkReducer from "./network.reducer";
import notificationReducer from "./notification.reducer";
import profileReducer from "./profile.reduce";



const rootReducer = () =>
	combineReducers({
		folders: FolderReducer,
		modals: ModalReducer,
		files: filesReducer,
		profile: profileReducer,
		notification: notificationReducer,
		resourceInfo: resourceInfo,
		bin: binReducer,
		network: networkReducer
	});

export default rootReducer;
