import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const makeStore = () => {
	return configureStore({
		reducer: rootReducer(),
		//   middleware: () => new Tuple(additionalMiddleware, logger),
		devTools: true,
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;
