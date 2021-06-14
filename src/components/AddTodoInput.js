import React, { useState, useCallback } from "react";
import { useTodo } from "../hooks";

const AddTodoInput = ({ todo, isEdit=false, setIsEdit }) => {
  const [ todoText, setTodoText ] = useState(todo ? todo.text : "");
  const { addTodo, updateTodo } = useTodo();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if(!todoText.trim()) {
      alert("Please enter todo");
      return;
    }
    if (todo && isEdit) {
      updateTodo(todo.id, todoText);
      setIsEdit && setIsEdit(false);
    } else {
      const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      }
      addTodo(todo);
    }
    setTodoText('');
  }, [todoText, addTodo, todo, isEdit, setIsEdit, updateTodo]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default AddTodoInput;
