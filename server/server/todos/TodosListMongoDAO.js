import { TodosListDAO } from '../../core/todos';


export default class TodosListMongoDAO extends TodosListDAO {
  constructor(mongoClient, mongoURI) {
    super();
    this.mongoClient = mongoClient;
    this.mongoURI = mongoURI;
  }

  async create(todoItem) {
    const connection = await this.mongoClient.connect(this.mongoURI);
    const db = connection.db('todos');
    const collection = db.collection('todos');

    try {
      return collection.insertOne(todoItem);
    } finally {
      connection.close();
    }
  }

  async update(todoItem) {
    const connection = await this.mongoClient.connect(this.mongoURI);
    const db = connection.db('todos');
    const collection = db.collection('todos');

    try {
      return collection.updateOne({ _id: id }, todoItem);
    } finally {
      connection.close();
    }
  }

  remove(todoItem) {
    return this.removeById(todoItem.id);
  }

  async getById(id) {
    const connection = await this.mongoClient.connect(this.mongoURI);
    const db = connection.db('todos');
    const collection = db.collection('todos');

    try {
      return collection.findOne({ _id: id }).toArray();
    } finally {
      connection.close();
    }
  }

  async removeById(id) {
    const connection = await this.mongoClient.connect(this.mongoURI);
    const db = connection.db('todos');
    const collection = db.collection('todos');

    let deletedCount = 0;

    try {
       const result = await collection.deleteOne({ _id: id }).toArray();
       deletedCount = result.deletedCount;
    } finally {
      connection.close();
    }

    return deletedCount;
  }

  async getAll() {
    const connection = await this.mongoClient.connect(this.mongoURI);
    const db = connection.db('todos');
    const collection = db.collection('todos');

    try {
      return collection.find().toArray();
    } finally {
      connection.close();
    }
  }
}
