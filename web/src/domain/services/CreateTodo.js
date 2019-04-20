import { create } from '../models/Todo';


const CreateTodo = ({ todosStore }) => ({ title, desc }) => new Promise(() => {
  const todo = create({ title, desc });
  return todosStore.addItem(todo);
});

export default CreateTodo;
