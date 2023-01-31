import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/http";
// export const addTask = createAction("ADD_TASK");
// export const removeTask = createAction("REMOVE_TASK");
// export const completedTask = createAction("COMPLETE_TASK");
//  const ADD_TASK = "ADD_TASK";
//  const REMOVE_TASK = "REMOVE_TASK";
//  const COMPLETE_TASK = "COMPLETE_TASK";
// export const addTask = (task) => {
//   return { type: actionTypes.ADD_TASK, payload: { task: task } };
// };
// export const removeTask = (id) => {
//   return { type: actionTypes.REMOVE_TASK, payload: { id: id } };
// };
// export const completedTask = (id) => {
//   return { type: actionTypes.COMPLETE_TASK, payload: { id: id } };
// };
let id = 0;
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};
export const fetchTask = createAsyncThunk(
  "fetchTask",
  async (a, { rejectWithValue }) => {
    try {
      const response = await axios.get("/tasks");
      return { tasks: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
export const addNewTask = createAsyncThunk(
  "addNewTask",
  async (newTaskObject, { rejectWithValue }) => {
    try {
      const response = await axios.post("/tasks", newTaskObject);
      return { tasks: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
export const updateCompleted = createAsyncThunk(
  "updateCompleted",
  async (objectThatWeAreUpdating, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/tasks/${objectThatWeAreUpdating.id}`,
        objectThatWeAreUpdating
      );
      return { tasks: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (idToDelete, { rejectWithValue }) => {
    try {
      await axios.delete(`/tasks/${idToDelete.id}`);
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    //action: function
    getTask: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    addTask: (state, action) => {
      state.tasks.push({
        id: ++id,
        task: action.payload.task,
        completed: false,
      });
    },
    removeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id !== action.payload.id
      );
      state.tasks.slice(index, 1);
    },
    completedTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id !== action.payload.id
      );
      state.tasks[index].completed = true;
    },
  },
  extraReducers: {
    [fetchTask.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTask.fulfilled]: (state, action) => {
      state.tasks = action.payload.tasks;
      state.loading = false;
    },
    [fetchTask.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [addNewTask.pending]: (state, action) => {
      // state.tasks = action.payload.tasks;
      state.loading = true;
    },
    [addNewTask.fulfilled]: (state, action) => {
      state.tasks = [...state.tasks, action.payload.tasks];
      console.log(state.tasks);
      state.loading = false;
    },
    [addNewTask.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [updateCompleted.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCompleted.fulfilled]: (state, action) => {
      state.tasks = action.payload.tasks;
      state.loading = false;
    },
    [updateCompleted.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [deleteTask.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteTask.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});
export const { getTask, addTask, removeTask, completedTask } =
  taskSlice.actions;
export default taskSlice.reducer;
// export default createReducer([], {
//   [addTask.type]: (state, action) => {
//     state.push({
//       id: ++id,
//       task: action.payload.task,
//       completed: false,
//     });
//   },
//   REMOVE_TASK: (state, action) => {
//     const index = state.findIndex((task) => task.id !== action.payload.id);
//     state.slice(index, 1);
//   },
//   COMPLETE_TASK: (state, action) => {
//     const index = state.findIndex((task) => task.id !== action.payload.id);
//     state[index].completed = true;
//   },
// });
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case addTask.type:
//       return [
//         ...state,
//         {
//           id: ++id,
//           task: action.payload.task,
//           completed: false,
//         },
//       ];
//     case removeTask.type:
//       return state.filter((task) => task.id !== action.payload.id);
//     case completedTask.type:
//       return state.map((task) =>
//         task.id === action.payload.id ? { ...task, completed: true } : task
//       );
//     default:
//       return state;
//   }
//   // if(action.type === 'ADD_TASK'){
//   //     return [
//   //         ...state,
//   //      {
//   //       id:++id,
//   //       task:action.payload.task,
//   //       completed:false
//   //     }]
//   // }
//   // else if(action.type==='REMOVE_TASK'){
//   //     return state.filter(task=>task.id!== action.payload.id)
//   // }
//   // return state
// }
