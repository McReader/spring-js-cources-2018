import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../utils';

import Item from './item';
import Placeholder from './placeholder';

const List = ({
  list, onItemClick, onClickLike, onAddingComment,
}) => {
  if (!list || !list.length) {
    return <Placeholder />;
  }

  return (
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
};

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
  onItemClick: PropTypes.func,
  onClickLike: PropTypes.func,
  onAddingComment: PropTypes.func,
};

List.defaultProps = {
  list: [],
  onItemClick: noop,
  onClickLike: noop,
  onAddingComment: noop,
};


export default List;
