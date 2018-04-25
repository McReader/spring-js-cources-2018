import React, { Component } from "react";
import { Form } from "../components/form/form";
import { List } from "../components/list";
import { data } from "../data";

import todosListDAO from '../dao/LocalStorageTodosListDAO';
import TodosListService from '../services/TodosListService';

export class ListContainer extends Component {
  state = {
    list: []
  };

  componentWillMount() {
    this.setState({ list: data });

    this.todosListService = new TodosListService(todosListDAO);
  }

  handleLike = id => {
    this.todosListService.likeItem(id);
  };

  handleAddingComment = ({ id, value }) => {
    this.todosListService.addItemComment(id, value);
  };

  handleAddingItem = (data) => {
    this.todosListService.createTodoItem(data);
  };

  render() {
    const { list } = this.state;
    return (
      <div>
        <List
          list={list}
          onItemClick={this.handleItemClick}
          onClickLike={this.handleLike}
          onAddingComment={this.handleAddingComment}
        />
        <Form onChangeInput={this.handleAddingItem} />
      </div>
    );
  }
}
