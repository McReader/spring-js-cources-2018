const express = require('express');
const app = express();

const { router } = require('./server/todos');


app.use('/todos', router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
