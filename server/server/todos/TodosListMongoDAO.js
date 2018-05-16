import { TodosListDAO } from '../../core/todos';


export default class TodosListMongoDAO extends TodosListDAO {
  constructor(connection) {
    super();
    this.connection = connection;
  }

  get db() {
    return this.connection.db('todos');
  }

  get collection() {
    return this.db.collection('todos');
  }

  getAllTodos() {
    return new Promise((resolve, reject) => {
      this.collection.find({}).toArray((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  saveAllTodos(todos) {
    super.saveAllTodos(todos);
  }
}
