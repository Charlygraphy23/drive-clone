import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export default configureStore({
  reducer: rootReducer,
  //   middleware: () => new Tuple(additionalMiddleware, logger),
  devTools: true,
});
