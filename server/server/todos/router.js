import DummyTodosListDAO from '../../core/todos/DummyTodosListDAO';

const express = require('express');

const router = express.Router({});

/**
 * @type {TodosListDAO}
 */
const todosListDAO = new DummyTodosListDAO();
const todoService = new TodoService();
const todosListService = new TodosListService(todoService, todosListDAO);


router.get('/', (req, res) => {
  // return all todos
  todosListDAO
    .getAllTodos()
    .then((todos) => {
      res.json(todos);
    });
});

router.post('/', (req, res) => {
  // create new todo
  const { title, description } = req.body;

  todosListService
    .createTodoItem({
      title, description
    })
    .then((id) => {
      res.json({ id });
    });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  todosListService
    .updateTodoItem(id, req.body)
    .then((id) => {
      res.json({ id });
    })
});

router.patch('/:id/completed', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  todosListService
    .toggleTodoItem(id, completed)
    .then((result) => {
      res.send(result);
    })
});

router.patch('/:id/like', (req, res) => {
  const { id } = req.params;
  const { isLiked } = req.body;

  let promise;

  if (isLiked) {
    promise = todosListService.likeTodoItem(id);
  } else {
    promise = todosListService.dislikeTodoItem(id);
  }

  promise.then((result) => {
    res.send(result);
  });
});

router.patch('/:id/comment', (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  todosListService
    .commentTodoItem(id, comment)
    .then((result) => {
      res.send(result);
    });
});


module.exports = router;
