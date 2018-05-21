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
      .getAll()
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
      .toggleItemCompleted(id, completed)
      .then((result) => {
        res.send(result);
      })
  });

  router.patch('/:id/like', (req, res) => {
    const { id } = req.params;
    const { isLiked } = req.body;

    todosListService
      .toggleItemLike(id, isLiked)
      .then((result) => res.send(result));
  });

  router.patch('/:id/comment', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    todosListService
      .addItemComment(id, comment)
      .then((result) => {
        res.send(result);
      });
  });

  return router;
}
