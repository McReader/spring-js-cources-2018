import sinon from 'sinon';

import TodoService from './TodoService';


describe('todo service', () => {
  let service;
  let todosStore;

  beforeEach(() => {
    service = TodoService({ todosStore });
  });

  describe('create', () => {
    let title = 'some title';
    let description = 'some description';

    beforeAll(() => {
      todosStore = { addItem: () => {} };
      sinon.spy(todosStore, 'addItem');
    });

    beforeEach(() => {
      return service.create({ title, description });
    });

    describe('when title and description are valid', () => {
      it('then it should call todo store and to put new item into it with correct arguments', () => {
        expect(todosStore.addItem.calledOnce).toBeTruthy();
        expect(todosStore.addItem.args[0][0].title).toBe(title);
        expect(todosStore.addItem.args[0][0].description).toBe(description);
      });
    });
  });
});
