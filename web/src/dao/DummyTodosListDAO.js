export default class DummyTodosListDAO {
  /**
   * @return {TodoObject[]}
   */
  getAllTodos() {
    return Promise.resolve([]);
  }

  /**
   * @param {TodoObject[]} todos
   */
  saveAllTodos(todos) {
    return Promise.resolve();
  }
}
