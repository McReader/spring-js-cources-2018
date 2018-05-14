import TodosListDAO from './TodosListDAO';

export default class DummyTodosListDAO extends TodosListDAO {
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
