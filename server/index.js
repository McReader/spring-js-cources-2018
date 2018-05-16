import express from 'express';
import { MongoClient } from 'mongodb';

import { createRouter } from './server/todos';

const url = 'mongodb://localhost:32770/';

const app = express();


app.listen(3000, () => {

// app.use(express.urlencoded());
  app.use(express.json());

  MongoClient.connect(url, (err, connection) => {
    if (err) throw err;

    const router = createRouter(connection);

    app.use('/todos', router);

    console.log('Server listening on port 3000');
  });
});
