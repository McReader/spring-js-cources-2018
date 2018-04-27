export default class LocalStorageTodosListDAO {
  listeners = null;

  getListeners() {
    if (!this.listeners) {
      this.listeners = [];
    }

    return this.listeners;
  }

  /**
   * @return {TodoObject[]}
   */
  getAllTodos() {
    const todos = JSON.parse(window.localStorage.getItem('todos'));
    return Promise.resolve(todos || []);
  }

  /**
   * @param {TodoObject[]} todos
   */
  saveAllTodos(todos) {
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
