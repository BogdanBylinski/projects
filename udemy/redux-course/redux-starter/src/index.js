import store from "./store/configureStore";
import { addEmployee } from "./store/employees/employees";
import {
  getTask,
  addTask,
  completedTask,
  removeTask,
  fetchTask,
  addNewTask,
  updateCompleted,
  deleteTask,
} from "./store/tasks/tasks";
import axios from "axios";

// const gettingTask = async () => {
//   try {
//     //calling api
//     const response = await axios.get("http://localhost:3003/api/tasks");
//     console.log(response);
//     //dispatch action
//     store.dispatch(getTask({ tasks: response.data }));
//   } catch (error) {
//     store.dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
//   }
// };
// gettingTask();

// store.dispatch(addNewTask({ task: "This is new task" }));
store.dispatch(deleteTask({ id: 16 }));
store.dispatch(removeTask({ id: 16 }));
store.dispatch(fetchTask());
console.log(store.getState());
