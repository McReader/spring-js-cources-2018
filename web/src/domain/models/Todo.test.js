import { create, update } from './Todo';


describe('Todo model', () => {
  describe('Given create function', () => {
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

    describe('when title is invalid', () => {
      beforeAll(() => {
        title = '';
        description = 'some description';
      });

      it('then it should throw an validation error', () => {
        throw new Error('not implemented');
      });
    });
  });
});
