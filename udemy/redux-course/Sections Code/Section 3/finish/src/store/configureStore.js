import { legacy_createStore as createStore } from "redux";
import reducer from "./tasks";

const store = createStore(reducer);

export default store;
