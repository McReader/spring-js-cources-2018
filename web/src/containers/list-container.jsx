import React, { Component } from "react";
import { Form } from "../components/form/form";
import { List } from "../components/list";

export class ListContainer extends Component {
  handleLike = id => {
    this.props.todosListService.likeItem(id);
  };

  handleAddingComment = ({ id, value }) => {
    this.props.todosListService.addItemComment(id, value);
  };

  handleAddingItem = (data) => {
    this.props.todosListService.createTodoItem(data);
  };

  render() {
    const { list } = this.props;
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
