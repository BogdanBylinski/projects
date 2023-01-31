import { createSlice } from "@reduxjs/toolkit";
let id = 0;

const employeeSlice = createSlice({
    name: "employees",
    initialState: [],
    reducers: {
        addEmployee: (state, action) => {
            state.push({ id: ++id, name: action.payload.name });
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
