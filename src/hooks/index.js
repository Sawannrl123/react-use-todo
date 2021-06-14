import React from "react";

import useLocalStorage from "./useLocalStorage";

export const initialState = {
  todos: [],
  loading: false,
};

const TodoContext = React.createContext(initialState);

export const createTodoIdentifier = (len = 12) =>
  [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join("");

export const useTodo = () => {
  const context = React.useContext(TodoContext);

  if (!context) throw new Error("Expected to be wrapped in a TodoProvider");

  return context;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_LOADING": 
      return {
        ...state,
        loading: action.loading
      }

    case "ADD_TODOS":
      return {
        ...state,
        todos: action.todos
      };

    case "ADD_TODO": {
      const todos = [...state.todos, action.todo];

      return {
        ...state,
        todos,
      }
    }

    case "TOGGLE_TODO": {
      const todos = state.todos.map((todo) => {
        if (todo.id !== action.id) return todo;

        return {
          ...todo,
          completed: !todo.completed,
        };
      });

      return {
        ...state,
        todos
      }
    }

    case "UPDATE_TODO": {
      const todos = state.todos.map((todo) => {
        if (todo.id !== action.id) return todo;

        return {
          ...todo,
          text: action.text,
        };
      });

      return {
        ...state,
        todos
      }
    }

    case "REMOVE_TODO": {
      const todos = state.todos.filter((i) => i.id !== action.id);

      return {
        ...state,
        todos
      }
    }

    default:
      throw new Error("No action specified");
  }
}

export const TodoProvider = ({
  children,
  id: todoId,
  defaultTodos = [],
  storage = useLocalStorage,
}) => {
  const id = todoId ? todoId : createTodoIdentifier();

  const [savedTodo, saveTodo] = storage(
    todoId ? `react-use-todo-${id}` : `react-use-todo`,
    JSON.stringify({
      id,
      ...initialState,
      todos: defaultTodos,
    })
  );

  const [state, dispatch] = React.useReducer(reducer, JSON.parse(savedTodo));

  const [filterdTodos, setFilteredTodos] = React.useState({
    todos: state.todos,
    filterdBy: 'all',
  });

  React.useEffect(() => {
    saveTodo(JSON.stringify(state));
  }, [state, saveTodo]);

  React.useEffect(() => {
    filtereTodos(filterdTodos.filterdBy.toUpperCase());
  }, [state]);

  const setTodos = (todos) => {
    dispatch({
      type: "ADD_TODOS",
      todos,
    });
  };

  const addTodo = (todo) => {
    if (!todo.id) throw new Error("You must provide an `id` for todo");

    if (!todo.hasOwnProperty("completed"))
      throw new Error("You must pass a `completed` for new todo");
    
    if (!todo.hasOwnProperty("text"))
      throw new Error("You must pass a `text` for new todo");

    dispatch({ type: "ADD_TODO", todo });
  };

  const toggleTodo = (id) => {
    if (!id) {
      return;
    }

    dispatch({ type: "TOGGLE_TODO", id });
  };

  const updateTodo = (id, text) => {
    if (!id && !text) {
      return;
    }

    dispatch({ type: "UPDATE_TODO", id, text });
  };

  const removeTodo = (id) => {
    if (!id) return;

    dispatch({ type: "REMOVE_TODO", id });
  };

  const filtereTodos = by => {
    if(!by) return;
    switch(by) {
      case 'ALL': {
        setFilteredTodos({
          todos: state.todos,
          filterdBy: 'all',
        });
        break;
      }
      case 'COMPLETED': {
        const completedTodos = state.todos.filter(todo => todo.completed);
        setFilteredTodos({
          todos: completedTodos,
          filterdBy: 'completed',
        });
        break;
      }
      case 'UNCOMPLETED': {
        const uncompletedTodos = state.todos.filter(todo => !todo.completed);
        setFilteredTodos({
          todos: uncompletedTodos,
          filterdBy: 'uncompleted',
        });
        break;
      }
      default: {
        setFilteredTodos({
          todos: state.todos,
          filterdBy: 'all',
        });
      }
    }
  } 

  const toggleLoading = (loading) => {
    if(loading === undefined || loading === null) return;
    dispatch({ type: "TOGGLE_LOADING", loading });
  }

  return (
    <TodoContext.Provider
      value={{
        ...state,
        filterdTodos,
        filtereTodos,
        setTodos,
        addTodo,
        toggleTodo,
        updateTodo,
        removeTodo,
        toggleLoading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};