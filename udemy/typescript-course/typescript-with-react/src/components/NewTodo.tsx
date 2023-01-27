import React, { useRef } from "react";
import "./NewTodo.css";
type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};
export const NewTodo = ({ ...props }: NewTodoProps) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
    props.onAddTodo(enteredText);
  };
  return (
    <form action="" onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text"></label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add todo</button>
    </form>
  );
};
