export default class LocalStorageTodosListDAO {
  /**
   * @return {TodoObject[]}
   */
  getAllTodos() {
    return Promise.resolve(JSON.parse(window.localStorage.getItem('todos')));
  }

  /**
   * @param {TodoObject[]} todos
   */
  saveAllTodos(todos) {
    window.localStorage.setItem('todos', JSON.stringify(todos));
    return Promise.resolve();
  }
}
