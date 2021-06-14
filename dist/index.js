"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoProvider = exports.useTodo = exports.createTodoIdentifier = exports.initialState = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireDefault(require("react"));

var _useLocalStorage = _interopRequireDefault(require("./useLocalStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initialState = {
  todos: [],
  loading: false
};
exports.initialState = initialState;

const TodoContext = /*#__PURE__*/_react.default.createContext(initialState);

const createTodoIdentifier = function createTodoIdentifier() {
  let len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
  return [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join("");
};

exports.createTodoIdentifier = createTodoIdentifier;

const useTodo = () => {
  const context = _react.default.useContext(TodoContext);

  if (!context) throw new Error("Expected to be wrapped in a TodoProvider");
  return context;
};

exports.useTodo = useTodo;

const reducer = function reducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "TOGGLE_LOADING":
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: action.loading
      });

    case "ADD_TODOS":
      return _objectSpread(_objectSpread({}, state), {}, {
        todos: action.todos
      });

    case "ADD_TODO":
      {
        const todos = [...state.todos, action.todo];
        return _objectSpread(_objectSpread({}, state), {}, {
          todos
        });
      }

    case "TOGGLE_TODO":
      {
        const todos = state.todos.map(todo => {
          if (todo.id !== action.id) return todo;
          return _objectSpread(_objectSpread({}, todo), {}, {
            completed: !todo.completed
          });
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          todos
        });
      }

    case "UPDATE_TODO":
      {
        const todos = state.todos.map(todo => {
          if (todo.id !== action.id) return todo;
          return _objectSpread(_objectSpread({}, todo), {}, {
            text: action.text
          });
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          todos
        });
      }

    case "REMOVE_TODO":
      {
        const todos = state.todos.filter(i => i.id !== action.id);
        return _objectSpread(_objectSpread({}, state), {}, {
          todos
        });
      }

    default:
      throw new Error("No action specified");
  }
};

const TodoProvider = (_ref) => {
  let {
    children,
    id: todoId,
    defaultTodos = [],
    storage = _useLocalStorage.default
  } = _ref;
  const id = todoId ? todoId : createTodoIdentifier();
  const [savedTodo, saveTodo] = storage(todoId ? "react-use-todo-".concat(id) : "react-use-todo", JSON.stringify(_objectSpread(_objectSpread({
    id
  }, initialState), {}, {
    todos: defaultTodos
  })));

  const [state, dispatch] = _react.default.useReducer(reducer, JSON.parse(savedTodo));

  const [filterdTodos, setFilteredTodos] = _react.default.useState({
    todos: state.todos,
    filterdBy: 'all'
  });

  _react.default.useEffect(() => {
    saveTodo(JSON.stringify(state));
  }, [state, saveTodo]);

  _react.default.useEffect(() => {
    filtereTodos(filterdTodos.filterdBy.toUpperCase());
  }, [state]);

  const setTodos = todos => {
    dispatch({
      type: "ADD_TODOS",
      todos
    });
  };

  const addTodo = todo => {
    if (!todo.id) throw new Error("You must provide an `id` for todo");
    if (!todo.hasOwnProperty("completed")) throw new Error("You must pass a `completed` for new todo");
    if (!todo.hasOwnProperty("text")) throw new Error("You must pass a `text` for new todo");
    dispatch({
      type: "ADD_TODO",
      todo
    });
  };

  const toggleTodo = id => {
    if (!id) {
      return;
    }

    dispatch({
      type: "TOGGLE_TODO",
      id
    });
  };

  const updateTodo = (id, text) => {
    if (!id && !text) {
      return;
    }

    dispatch({
      type: "UPDATE_TODO",
      id,
      text
    });
  };

  const removeTodo = id => {
    if (!id) return;
    dispatch({
      type: "REMOVE_TODO",
      id
    });
  };

  const filtereTodos = by => {
    if (!by) return;

    switch (by) {
      case 'ALL':
        {
          setFilteredTodos({
            todos: state.todos,
            filterdBy: 'all'
          });
          break;
        }

      case 'COMPLETED':
        {
          const completedTodos = state.todos.filter(todo => todo.completed);
          setFilteredTodos({
            todos: completedTodos,
            filterdBy: 'completed'
          });
          break;
        }

      case 'UNCOMPLETED':
        {
          const uncompletedTodos = state.todos.filter(todo => !todo.completed);
          setFilteredTodos({
            todos: uncompletedTodos,
            filterdBy: 'uncompleted'
          });
          break;
        }

      default:
        {
          setFilteredTodos({
            todos: state.todos,
            filterdBy: 'all'
          });
        }
    }
  };

  const toggleLoading = loading => {
    if (loading === undefined || loading === null) return;
    dispatch({
      type: "TOGGLE_LOADING",
      loading
    });
  };

  return /*#__PURE__*/_react.default.createElement(TodoContext.Provider, {
    value: _objectSpread(_objectSpread({}, state), {}, {
      filterdTodos,
      filtereTodos,
      setTodos,
      addTodo,
      toggleTodo,
      updateTodo,
      removeTodo,
      toggleLoading
    })
  }, children);
};

exports.TodoProvider = TodoProvider;