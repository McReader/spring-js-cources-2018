import TodosListDAO from './TodosListDAO';

export default class DummyTodosListDAO extends TodosListDAO {
  create(todoItem) {
    return Promise.resolve(todoItem);
  }

  update(todoItem) {
    return Promise.resolve(todoItem);
  }

  remove(todoItem) {
    return this.removeById(todoItem.id);
  }

  getById(id) {
    return Promise.resolve({});
  }

  removeById(id) {
    return Promise.resolve(1);
  }

  getAll() {
    return Promise.resolve([]);
  }
}
