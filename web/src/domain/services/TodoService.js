import { create } from '../models/Todo';


const TodoService = ({ todosStore }) => ({
  create({ title, description }) {
    return new Promise((resolve) => {
      const todo = create({ title, description });
      todosStore.addItem(todo);
      resolve();
    });
  },
  update({ title, desc }) {
    return new Promise(() => {
      const todo = create({ title, desc });
      return todosStore.updateItem(todo);
    });
  },
});

export default TodoService;
