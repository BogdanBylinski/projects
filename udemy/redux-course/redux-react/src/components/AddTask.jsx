import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask, addTask } from "../store/tasks/tasks";
const AddTask = () => {
  const [taskInput, setTaskInput] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTask({ task: taskInput }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={taskInput}
        type="text"
        name="task"
        placeholder="Enter new task..."
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
};

export default AddTask;
