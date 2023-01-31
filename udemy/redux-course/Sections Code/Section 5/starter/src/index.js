import store from "./store/configureStore";
import { addTask, removeTask, completedTask } from "./store/tasks";

// const unsubscribe = store.subscribe(() => {
//     console.log("Updated", store.getState());
// });

// store.dispatch(addTask("Task 1"));
// store.dispatch(addTask("Task 2"));
// console.log(store.getState());

// unsubscribe();
// store.dispatch(completedTask(2));

// store.dispatch(removeTask(1));
// console.log(store.getState());
