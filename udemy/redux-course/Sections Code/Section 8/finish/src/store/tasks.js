import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
let id = 0;
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// export const fetchTasks = createAsyncThunk(
//     "fetchTasks",
//     async (a, { rejectWithValue }) => {
//         try {
//             const response = await axios.get("/tasks");
//             return { tasks: response.data };
//         } catch (error) {
//             return rejectWithValue({ error: error.message });
//         }
//     }
// );

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // action: function
        apiRequested: (state, action) => {
            state.loading = true;
        },
        apiRequestFailed: (state, action) => {
            state.loading = false;
        },
        getTasks: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            state.tasks.splice(index, 1);
        },
        completedTask: (state, action) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            state.tasks[index].completed = action.payload.completed;
        },
    },
    // extraReducers: {
    //     [fetchTasks.pending]: (state, action) => {
    //         state.loading = true;
    //     },

    //     [fetchTasks.fulfilled]: (state, action) => {
    //         state.tasks = action.payload.tasks;
    //         state.loading = false;
    //     },

    //     [fetchTasks.rejected]: (state, action) => {
    //         state.error = action.payload.error;
    //         state.loading = false;
    //     },
    // },
});

export const {
    apiRequested,
    apiRequestFailed,
    getTasks,
    addTask,
    removeTask,
    completedTask,
} = taskSlice.actions;
export default taskSlice.reducer;

// Action Creators
const url = "/tasks";

export const loadTasks = () =>
    apiCallBegan({
        url,
        onStart: apiRequested.type,
        onSuccess: getTasks.type,
        onError: apiRequestFailed.type,
    });

export const addNewTask = (task) =>
    apiCallBegan({
        url,
        method: "POST",
        data: task,
        onSuccess: addTask.type,
    });

export const updateCompleted = (task) =>
    apiCallBegan({
        // /tasks/6
        url: `${url}/${task.id}`,
        method: "PATCH",
        data: task,
        onSuccess: completedTask.type,
    });

export const deleteTask = (task) =>
    apiCallBegan({
        // /tasks/6
        url: `${url}/${task.id}`,
        method: "DELETE",
        onSuccess: removeTask.type,
    });
