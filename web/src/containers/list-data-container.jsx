import React, { Component } from 'react';

import LocalStorageTodosListDAO from '../dao/LocalStorageTodosListDAO';
import TodosListService from '../services/TodosListService';
import TodoService from '../services/TodoService';

import { ListContainer } from './list-container';


export class ListDataContainer extends Component {
  state = {
    list: []
  };

  componentWillMount() {
    this.todosListDAO = new LocalStorageTodosListDAO();
    this.todoService = new TodoService();
    this.todosListService = new TodosListService(this.todosListDAO, this.todoService);
  }

  componentDidMount() {
    this.todosListDAO.getAllTodos()
      .then((todos) => {
        this.setState({
          list: todos,
        });
      });

    this.unsubscribe = this.todosListDAO.subscribe((todos) => {
      this.setState({
        list: todos,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { list } = this.state;

    return (
      <ListContainer
        list={list}
        todosListService={this.todosListService}
      />
    );
  }
}
