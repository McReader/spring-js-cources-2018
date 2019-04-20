import { addItem, createTodosList } from '../models/TodosList';


const LOCAL_STORAGE_KEY = 'todos';


const TodosStore = ({ localStorage }) => ({
  getList: () => {
    const todosListJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list =  createTodosList(JSON.parse(todosListJSON) || []);
    return Promise.resolve(list);
  },
  addItem: (todo) => {
    const list = this.getList();
    const updatedList = addItem(todo, list);
    return this.saveList(updatedList);
  },
  saveList: (todosList) => {
    const updatedTodosListJSON = JSON.stringify(todosList);
    localStorage.setItem(LOCAL_STORAGE_KEY, updatedTodosListJSON);
    return Promise.resolve();
  },
});

export default TodosStore;
