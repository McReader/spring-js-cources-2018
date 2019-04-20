import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './TodoForm.css';


export default function TodoForm(props) {
  const {
    title,
    descr,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
  } = props;

  return (
    <form onSubmit={onSubmit} className="TodoForm">
      <Grid
        container
        className="TodoFormGrid"
        spacing={40}
        direction="column"
      >
        <Grid item>
          <TextField
            label="Title"
            name='title'
            fullWidth
            onChange={onTitleChange}
            value={title}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Description"
            name='descr'
            fullWidth
            onChange={onDescriptionChange}
            value={descr}
          />
        </Grid>

        <Grid item>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            type="submit"
          >
            Create todo
          </Button>
        </Grid>
      </Grid>
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
