export default class TodosListDAO {
  /**
   * @param {TodoItem} todoItem
   * @return {Promise<TodoItem>}
   */
  create(todoItem) {
    throw new Error('Not implemented');
  }

  /**
   * @param {TodoItem} todoItem
   * @return {Promise<TodoItem>}
   */
  update(todoItem) {
    throw new Error('Not implemented');
  }

  /**
   * @param {Promise<TodoItem>} todoItem
   * @return {number}
   */
  remove(todoItem) {
    throw new Error('Not implemented');
  }

  /**
   * @param {string} id
   * @return {Promise<TodoItem>}
   */
  getById(id) {
    throw new Error('Not implemented');
  }

  /**
   * @param {string} id
   * @return {Promise<number>}
   */
  removeById(id) {
    throw new Error('Not implemented');
  }

  /**
   * @return {Promise<Array<TodoItem>>}
   */
  getAll() {
    throw new Error('Not implemented');
  }
}
