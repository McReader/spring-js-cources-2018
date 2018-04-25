/* eslint-disable */
import TodosListService from './TodosListService';
import DummyTodosListDAO from '../dao/DummyTodosListDAO';


describe('TodosListService', () => {
  let todosListService;

  beforeEach(() => {
    todosListService = new TodosListService(new DummyTodosListDAO());
  });

  describe('when creating new todo', () => {
    let justCreatedTodoPromise;
    let data = {
      title: 'Test',
      description: 'Test description',
    };

    beforeEach(() => {
      justCreatedTodoPromise = todosListService.createTodoItem(data);
    });

    it('everything should be fine', () => {
      justCreatedTodoPromise.then((justCreatedTodo) => {
        expect(justCreatedTodo).toEqual({
          title: data.test,
          description: data.description,
        });
      });
    });
  });

  describe('when updating existing todo', () => {
    it('everything should be fine', () => {
      todosListService = new TodosListService()
    });
  });
});