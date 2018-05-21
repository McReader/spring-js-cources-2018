import sinon from 'sinon';

import TodosListService from './TodosListService';
import DummyTodosListDAO from './DummyTodosListDAO';
import TodoService from './TodoService';


describe('TodosListService', () => {
  let todosListService;
  let todosListDAO;
  let todoService;

  beforeEach(() => {
    todosListService = new TodosListService(todosListDAO, todoService);
  });

  describe('when creating new todo', () => {
    let justCreatedTodo;
    let todoChange;
    let result;

    beforeAll(() => {
      todosListDAO = new DummyTodosListDAO();
      todoService = new TodoService();
    });

    beforeEach(() => {
      justCreatedTodo = {
        id: '1231233513251251235',
      };
      todoChange = {
        title: 'Test',
        description: 'Test description',
      };

      sinon.stub(todoService, 'createTodo').returns(justCreatedTodo);
      sinon.spy(todosListDAO, 'create');

      return todosListService.createTodoItem(todoChange).then((r) => {
        result = r;
      });
    });

    afterEach(() => {
      todoService.createTodo.restore();
      todosListDAO.create.restore();
    });

    it('should return just created created todo', () => {
      expect(result).toBe(justCreatedTodo);
    });

    it('todo service should be called for creating new todo', () => {
      expect(todoService.createTodo.calledOnce).toBe(true);
    });

    it('todo service should be called with appropriate params', () => {
      expect(todoService.createTodo.getCall(0).args[0]).toBe(todoChange);
    });

    it('should call todosListDAO\'s create method', () => {
      expect(todosListDAO.create.calledOnce).toBe(true);
    });
  });
});
