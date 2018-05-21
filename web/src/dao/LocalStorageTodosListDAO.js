import TodosListDAO from './TodosListDAO';


export default class LocalStorageTodosListDAO extends TodosListDAO {
  static findIndex(todoId, todos) {
    return todos.findIndex((todo) => todo.id === todoId);
  }

  async create(todoItem) {
    const todos = await this.getAll();
    await this.saveAll([...todos, todoItem]);
    return todoItem;
  }

  async update(todoItem) {
    const todos = await this.getAll();

    const targetIndex = LocalStorageTodosListDAO.findIndex(todoItem.id, todos);
    const result = todos.splice(targetIndex, 1, todoItem);

    await this.saveAll(result);

    return todoItem;
  }

  async remove(todoItem) {
    return this.removeById(todoItem.id);
  }

  async getById(id) {
    const todos = await this.getAll();
    return todos.find((todo) => todo.id === id);
  }

  async removeById(id) {
    const todos = await this.getAll();

    const targetIndex = LocalStorageTodosListDAO.findIndex(id, todos);
    const result = todos.splice(targetIndex, 1);

    await this.saveAll(result);

    return 1;
  }

  getAll() {
    const todos = JSON.parse(window.localStorage.getItem('todos'));
    return Promise.resolve(todos || []);
  }

  listeners = null;

  getListeners() {
    if (!this.listeners) {
      this.listeners = [];
    }

    return this.listeners;
  }

  saveAll(todos) {
    try {
      window.localStorage.setItem('todos', JSON.stringify(todos));
      this.notifyListeners(todos);
    } catch(e) {
      return Promise.reject(e);
    }

    return Promise.resolve();
  }

  notifyListeners(todos) {
    this
      .getListeners()
      .forEach((listener) => {
        listener(todos);
      });
  }

  subscribe(listener) {
    const listeners = this.getListeners();

    listeners.push(listener);

    return () => {
      listeners.filter((l) => listener !== l);
    };
  }
}
