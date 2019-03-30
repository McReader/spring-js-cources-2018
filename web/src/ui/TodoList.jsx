import React from 'react';


export default class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <ul>
        { todos.map((todo) => (
          <li>{ todo.title }</li>
        ))}
      </ul>
    );
  }
}
