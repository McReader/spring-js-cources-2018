function TodoNotFoundError(todoId) {
  Error.call(this);

  this.name = 'TodoNotFoundError';
  this.message = `Todo with id "${todoId}" not found`;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, TodoNotFoundError);
  } else {
    this.stack = (new Error()).stack;
  }
}

TodoNotFoundError.prototype = Object.create(Error.prototype);

export default TodoNotFoundError;
