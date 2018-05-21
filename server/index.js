import express from 'express';

import { createRouter } from './server/todos';

const app = express();


app.listen(3000, () => {
// app.use(express.urlencoded());
  app.use(express.json());

  app.use('/todos', createRouter());

  console.log('Server listening on port 3000');
});
