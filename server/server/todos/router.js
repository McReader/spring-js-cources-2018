import express from 'express';
import { MongoClient } from 'mongodb';

import { TodoService, TodosListService } from '../../core/todos';
import {MONGO_URI} from '../constants';

import TodosListMongoDAO from './TodosListMongoDAO';


export default function createRouter() {
  const router = express.Router({});

  /**
   * @type {TodosListDAO}
   */
  const todosListDAO = new TodosListMongoDAO(MongoClient, MONGO_URI);
  const todoService = new TodoService();
  const todosListService = new TodosListService(todosListDAO, todoService);


  router.get('/', (req, res) => {
    todosListDAO
      .getAllTodos()
      .then((todos) => {
        res.json(todos);
      });
  });

  router.post('/', (req, res) => {
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
      });
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

  return router;
}
