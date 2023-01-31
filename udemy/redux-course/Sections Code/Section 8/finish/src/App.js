import React from "react";
import AddTask from "./components/AddTask";
import AddTaskClass from "./components/AddTaskClass";
import Tasks from "./components/Tasks";

const App = () => {
    return (
        <div>
            <AddTaskClass />
            <Tasks />
        </div>
    );
};

export default App;
