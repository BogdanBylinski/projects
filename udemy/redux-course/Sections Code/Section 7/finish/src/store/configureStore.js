import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employees";
import taskReducer from "./tasks";
import error from "./middleware/error";
import api from "./middleware/api";

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        employees: employeeReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        api,
        error,
    ],
});

export default store;
