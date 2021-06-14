import React from 'react';
import { TodoProvider } from './hooks'
import AddTodoInput from './components/AddTodoInput';
import Todos from './components/Todos';
import Filter from './components/Filter';

const App = () => {
  return (
    <TodoProvider id={1}>
      <AddTodoInput />
      <Filter />
      <Todos />
    </TodoProvider>
  );
}

export default App;
