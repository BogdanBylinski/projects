import React, { useState } from "react";
import { NewTodo } from "./components/NewTodo";
import { ToDoList } from "./components/ToDoList";
import { Todo } from "./todo.module";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const todos =[{id:'t1', text:"Finish the course"}]
  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };
  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <ToDoList items={todos} onDeleteTodo={todoDeleteHandler}></ToDoList>
    </div>
  );
}

export default App;
