import { TodosListDAO } from '../../core/todos';


export default class TodosListMongoDAO extends TodosListDAO {
  getAllTodos() {
    super.getAllTodos();
  }

  saveAllTodos(todos) {
    super.saveAllTodos(todos);
  }
}
