import React, { useEffect } from "react";
import { useState } from "react";
import { fetchTask } from "../store/tasks/tasks";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./AddTask";
export const Tasks = () => {
  //   const [tasks, setTasks] = useState([]);
  const { tasks, loading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTask());
  }, []);
  console.log(tasks);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {tasks.length &&
            tasks.map((task) => (
              <p key={task.id}>
                {task.id}----{task.task}
              </p>
            ))}
        </div>
      )}
    </>
  );
};
