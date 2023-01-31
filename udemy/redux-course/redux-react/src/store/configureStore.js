// import { legacy_createStore as createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// const store = createStore(reducer, devToolsEnhancer({ trace: true }));
// export default store;

import taskReducer from "./tasks/tasks";
import employeeReducer from "./employees/employees";
import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import error from "./middleware/error";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // logger,
    error,
  ],
});
export default store;
