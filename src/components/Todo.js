import React, { useState } from "react";
import { useTodo } from "../hooks";
import AddTodoInput from "./AddTodoInput";

const Todo = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { removeTodo, toggleTodo } = useTodo();

  return (
    <li>
      <input
        id={todo.id}
        type="checkbox"
        value={todo.completed}
        checked={todo.completed}
        onChange={(e) => toggleTodo(todo.id)}
      />
      <label
        htmlFor={todo.id}
        style={{ textDecoration: todo.completed && "line-through" }}
      >
        {todo.text}
      </label>
      <button onClick={(e) => removeTodo(todo.id)}>Remove</button>
      <button onClick={(e) => setIsEdit(true)} disabled={todo.completed}>
        Edit
      </button>
      {isEdit && (
        <AddTodoInput isEdit={isEdit} todo={todo} setIsEdit={setIsEdit} />
      )}
    </li>
  );
};

export default Todo;
