<h1 align="center">
  react-use-todo
</h1>
<p align="center">
A lightweight todo app hook for React, Next.js, and Gatsby.
</p>
<p align="center">
It helps you to build todo app with different skins without worring about the logic part. It has many utility methods available on the hook.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-use-todo">
    <img src="https://img.shields.io/npm/v/react-use-todo.svg" alt="Version" />
  </a>
  <a href="https://www.npmjs.com/package/react-use-todo">
    <img src="https://img.shields.io/npm/dw/react-use-todo.svg" alt="Downloads/week" />
  </a>
  <a href="https://github.com/Sawannrl123/react-use-todo/blob/main/package.json">
    <img src="https://img.shields.io/npm/l/react-use-todo.svg" alt="License" />
  </a>
  <a href="https://github.com/Sawannrl123/react-use-todo/network/members">
    <img src="https://img.shields.io/github/forks/Sawannrl123/react-use-todo" alt="Forks on GitHub" />
  </a>
  <a href="https://github.com/Sawannrl123/react-use-todo/stargazers">
    <img src="https://img.shields.io/github/stars/Sawannrl123/react-use-todo" alt="Forks on GitHub" />
  </a>
  <img src="https://badgen.net/bundlephobia/minzip/react-use-todo" alt="minified + gzip size" />
</p>

## Why?

- ![Bundle size](https://badgen.net/bundlephobia/minzip/react-use-todo)
- **No dependencies**
- 🔥 Persistent todos with local storage, or your own adapter
- ⭐️ Supports multiples todos per page
- 🥞 Works with Next, Gatsby, React

## Quick Start

[Demo](https://codesandbox.io/s/react-use-todo-304lc)

## Install

```bash
npm install react-use-todo # yarn add react-use-todo
```

## `TodoProvider`

You will need to wrap your application with the `TodoProvider` component so that the `useTodo` hook can access the todo state.

Todos are persisted across visits using `localStorage`, unless you specify your own `storage` adapter.

#### Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import { TodoProvider } from "react-use-todo";

ReactDOM.render(
  <TodoProvider>{/* render app/todo here */}</TodoProvider>,
  document.getElementById("root")
);
```

#### Props

| Prop           | Required | Description                                                                                                                                                |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | _No_     | `id` for your todos to enable automatic todos retrieval via `window.localStorage`. If you pass a `id` then you can use multiple instances of `TodoProvider`. |
| `defaultTodos` | _No_     | set initial state with defaultTodos .                                                                                                    |
| `storage`      | _No_     | Must return `[getter, setter]`.                                                                                                    |

## `useTodo`

The `useTodo` hook exposes all the getter/setters for your todo state.

### `loading: boolean`

The `loading` variable gives you loading state. Useful for async task.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { loading } = useTodo();

if (loading) // do something
else // something
```

### `toggleLoading(loading: boolean)`

The `toggleLoading` method will help you set the loading state. Useful for async task.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { toggleLoading, loading } = useTodo();

useEffect(() => {
  toggleLoading(true);
  fetch(url).then(data => toggleLoading(false);)
}, [])

if (loading) // Show loading state
else // Show data
```

### `todos: Array<Object>`

The `todos` contains the list of todos.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { todos } = useTodo();

<ul>
  {todos.map(todo => <li key={todo.id}>{todos.text}</li>)}
</ul>
```

### `filterdTodos: Object`

The `filterdTodos` filtered array based on the selected filter.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { filterdTodos: { todos } } = useTodo();

<ul>
  {todos.map(todo => <li key={todo.id}>{todos.text}</li>)}
</ul>
```

### `filtereTodos(by: string)`

The `filtereTodos` method to filter todos based on selected filter. Available value (ALL, COMPLETED, UNCOMPLETED)

#### Usage

```js
import { useTodo } from "react-use-todo";

const {
  filtereTodos,
  filterdTodos: { filterdBy },
} = useTodo();

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
```


### `setTodos(Array<Object>)`

The `setTodos` method to replace todos with passed todos. Useful for api data.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { setTodos } = useTodo();

const todos = [{
  id: Date.now(),
  text: 'first todo',
  completed: false,
}]
setTodos(todos);
```

### `addTodo(Object)`

The `addTodo` method to add new todo.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { addTodo } = useTodo();

// these keys are mandatory to pass while adding your todo.
const todo = {
  id: Date.now(),
  text: 'first todo',
  completed: false,
}
addTodo(todo);
```

### `toggleTodo(todoId: string | number)`

The `toggleTodo` method to toggle the completd state of todo.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { toggleTodo } = useTodo();

const todo = {
  id: Date.now(),
  text: 'first todo',
  completed: false,
}
<input
  id={todo.id}
  type="checkbox"
  value={todo.completed}
  checked={todo.completed}
  onChange={(e) => toggleTodo(todo.id)}
/>
```

### `updateTodo(todoId: string | number, text: string)`

The `updateTodo` method to update the text of todo.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { updateTodo, filterdTodos: { todos } } = useTodo();

updateTodo(todos[0].id, 'Update this');
```


### `removeTodo(todoId: string)`

The `removeTodo` method to remove todo.

#### Usage

```js
import { useTodo } from "react-use-todo";

const { removeTodo, filterdTodos: { todos } } = useTodo();

removeTodo(todos[0].id);
```
