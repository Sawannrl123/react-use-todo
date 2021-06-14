import React from "react";
import { useTodo } from "../hooks";

const Filter = () => {
  const {
    filtereTodos,
    filterdTodos: { filterdBy },
  } = useTodo();

  return (
    <div>
      <button
        style={{ backgroundColor: filterdBy === "all" && "red" }}
        onClick={(_) => filtereTodos("ALL")}
      >
        All
      </button>
      <button
        style={{ backgroundColor: filterdBy === "completed" && "red" }}
        onClick={(_) => filtereTodos("COMPLETED")}
      >
        Completed
      </button>
      <button
        style={{ backgroundColor: filterdBy === "uncompleted" && "red" }}
        onClick={(_) => filtereTodos("UNCOMPLETED")}
      >
        Uncompleted
      </button>
    </div>
  );
};

export default Filter;
