import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './TodoList.css';



export default function TodoList(props) {
  const { todos } = props;

  return (
    <List className="TodoList">
      {todos.map((todo) => (
        <ListItem button>
          <Checkbox/>
          <ListItemText>
            {todo.title}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
};

TodoList.defaultProps = {
  todos: [],
};
