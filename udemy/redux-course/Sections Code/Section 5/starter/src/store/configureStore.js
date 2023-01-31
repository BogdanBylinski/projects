import { legacy_createStore as createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./tasks";

const store = createStore(reducer, devToolsEnhancer({ trace: true }));

export default store;
