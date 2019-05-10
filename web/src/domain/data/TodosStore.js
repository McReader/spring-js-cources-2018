import { create, getId } from '../models/Todo';
import { addItem } from '../models/TodosList';


const LOCAL_STORAGE_KEY = 'todos';


const TodosStore = ({ localStorage }) => ({
  getList: () => {
    const todosListJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list =  JSON.parse(todosListJSON) || [];
    return Promise.resolve(list);
  },
  async getById(todoId) {
    const list = await this.getList();
    const item = list.find(todo => getId(todo) === todoId);
    return item ? create(item) : null;
  },
  addItem(todo) {
    const list = this.getList();
    const updatedList = addItem(todo, list);
    return this.saveList(updatedList);
  },
  async updateItem(change, todo) {
    const todoId = getId(todo);
    const list = await this.getList();
    const targetIndex = list.findIndex(todo => getId(todo) === todoId);
    if (index < 0) {
      throw new Error(`Can't update item with id "${todoId}. Item not found"`);
    }
    const updatedList = list.map((item, index) => {
      if (index === targetIndex) {
        return update(change, item);
      }

      return item;
    });
    return this.saveList(updatedList);
  },
  saveList(todosList) {
    const updatedTodosListJSON = JSON.stringify(todosList);
    localStorage.setItem(LOCAL_STORAGE_KEY, updatedTodosListJSON);
    return Promise.resolve();
  },
});

export default TodosStore;
