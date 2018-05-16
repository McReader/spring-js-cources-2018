export default class TodosListService {
  /**
   * @type {TodosListDAO}
   */
  todosListDAO;

  /**
   * @param {TodosListDAO} todosListDAO
   * @param todoService
   */
  constructor(todosListDAO, todoService) {
    console.log()
    this.todosListDAO = todosListDAO;
    this.todoService = todoService;
  }

  findTodoIndex(todoId, todos) {
    return todos.findIndex((todo) => todo.id === todoId);
  }

  /**
   * @param {Object} data
   * @param {string} data.title
   * @param {string} data.description
   * @return {Promise<string>}
   */
  createTodoItem(data) {
    let todoId;

    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const todo = this.todoService.createTodo(data);
        todoId = todo.id;
        const result = [...todos, todo];
        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }

  /**
   * @param {string} todoId
   * @param {TodoChange} change
   */
  updateTodoItem(todoId, change) {
    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const index = this.findTodoIndex(todoId, todos);
        const target = todos[index];
        const result = [...todos];

        result.splice(index, 1, this.todoService.updateTodo(change, target));

        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }

  /**
   * @param {string} todoId
   * @param {string} commentText
   */
  addItemComment(todoId, commentText) {
    this.updateTodoItem(todoId, { comment: commentText });
  }

  /**
   * @param {string} todoId
   */
  likeItem(todoId) {
    this.updateTodoItem(todoId, { isLiked: true });
  }
}
