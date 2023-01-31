import store from "./store/configureStore";
import {
    loadTasks,
    addNewTask,
    updateCompleted,
    deleteTask,
} from "./store/tasks";

// const gettingTasks = async () => {
//     try {
//         // calling api
//         const response = await axios.get("http://localhost:5000/api/tasks");
//         console.log(response);

//         // dispatch action
//         store.dispatch(getTasks({ tasks: response.data }));
//     } catch (error) {
//         store.dispatch({
//             type: "SHOW_ERROR",
//             payload: { error: error.message },
//         });
//     }
// };

// gettingTasks();

store.dispatch(loadTasks());
store.dispatch(addNewTask({ task: "Complete This Exercise" }));
store.dispatch(updateCompleted({ id: 6, completed: true }));
store.dispatch(deleteTask({ id: 6 }));
