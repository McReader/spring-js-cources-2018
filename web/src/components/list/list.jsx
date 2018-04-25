import React from 'react';
import Item from './item';


const List = ({
  list, onItemClick, onClickLike, onAddingComment,
}) => (
  <ul className="todo-list">
    {list.map(item => (
      <Item
        key={item.id}
        {...item}
        onClick={onItemClick}
        onClickLike={onClickLike}
        onAddingComment={onAddingComment}
      />
    ))}
  </ul>
);


export default List;
