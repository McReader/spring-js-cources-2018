import React from 'react';
import PropTypes from 'prop-types';


export default function TodoForm(props) {
  const {
    title,
    descr,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input
          name='title'
          onChange={onTitleChange}
          value={title}
        />
      </label>

      <label>
        <span>Description</span>
        <input
          name='descr'
          onChange={onDescriptionChange}
          value={descr}
        />
      </label>

      <button type="submit">
        Create todo
      </button>
    </form>
  );
}

TodoForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
  title: '',
  description: '',
  onDescriptionChange: null,
  onTitleChange: null,
  onSubmit: null,
};
