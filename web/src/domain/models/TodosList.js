/**
 * @param {TodoModel} todoitem
 * @param {TodosList} todosList
 * @returns {TodosList}
 */
export const addItem = (todoitem, todosList) => [...todosList, todoitem];

/**
 * @param {Array<TodoModel>} items
 * @returns {TodosList}
 */
export const createTodosList = (items = []) => items;
