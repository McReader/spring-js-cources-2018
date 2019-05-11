import { create, update } from './Todo';


describe('todo model', () => {
  describe('given create function', () => {
    let title;
    let description;
    let todo;

    beforeEach(() => {
      todo = create({ title, description });
    });

    describe('when all params are valid', () => {
      beforeAll(() => {
        title = 'some title';
        description = 'some description';
      });

      it('then it should return new todo item', () => {
        expect(todo.title).toBe(title);
        expect(todo.description).toBe(description);
      });
    });
  });
});
