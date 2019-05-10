import { create } from '../models/Todo';


const TodoService = ({ todosStore }) => ({
  create({ title, desc }) {
    return new Promise(() => {
      const todo = create({ title, desc });
      return todosStore.addItem(todo);
    });
  },
  update({ title, desc }) {
    return new Promise(() => {
      const todo = create({ title, desc });
      return todosStore.addItem(todo);
    });
  },
});

export default TodoService;
