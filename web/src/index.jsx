import React from 'react';
import ReactDOM from 'react-dom';

import TodoForm from './ui/TodoForm.jsx';
import TodoList from './ui/TodoList.jsx';

import withTodoForm from './ui/withTodoForm.jsx';


const EnhancedTodoForm = withTodoForm(TodoForm);

class Application extends React.Component {
  render() {
    return (
      <div>
        <EnhancedTodoForm
          onSubmit={(todoItem) => {
            console.log(todoItem);
          }}
        />
        <TodoList
          todos={[]}
        />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));
