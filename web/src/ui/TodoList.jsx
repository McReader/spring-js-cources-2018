import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import './TodoList.css';


export default class TodoList extends React.PureComponent {
  render() {
    const { todos } = this.props;

    return (
      <List className="TodoList">
        { todos.map((todo) => (
          <ListItem button>
            <Checkbox />
            <ListItemText>
              { todo.title }
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}
