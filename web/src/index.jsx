import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import TodosStore from './domain/data/TodosStore';
import CreateTodo from './domain/services/CreateTodo';

import TodoForm from './ui/TodoForm.jsx';
import TodoList from './ui/TodoList.jsx';

import withTodoForm from './ui/withTodoForm.jsx';



const EnhancedTodoForm = withTodoForm(TodoForm);


const todosStore = TodosStore({ localStorage: window.localStorage });
const createTodoService = CreateTodo({ todosStore });

function Application() {
  const [todos, setTodos] = useState(() => {
    const todosJSON = localStorage.getItem('todos');
    return JSON.parse(todosJSON);
  });

  return (
    <div>
      <EnhancedTodoForm
        onSubmit={({ title, descr }) => {
          createTodoService({ title, desc: descr });
        }}
      />
      <TodoList
        todos={todos}
      />
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById('root'));
