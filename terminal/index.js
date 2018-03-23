#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs');
const path = require('path');

program
  .version('0.0.1')
  .description('This is a TODO application');

const storagePath = path.resolve('./store.json');
const ACCOUNT_ID = 1;


function openFile() {
  return new Promise((resolve, reject) => {
    fs.open(storagePath, 'a+', (err, fd) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(fd);
    });
  });
}

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

function writeFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(storagePath, data, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function getAllTodos() {
  return openFile()
    .then(() => {
      return readFile();
    })
    .then((data) => {
      return JSON.parse(data);
    })
    .then((storage) => {
      return storage.todos || [];
    });
}

function saveAllTodos(todos) {
  return writeFile(JSON.stringify({ todos }));
}

function findTodoIndex(id, todos) {
  return todos.findIndex((todo) => todo.id === id)
}

function createTodo(data) {
  return {
    createdDate: new Date(),
    createdByUserId: ACCOUNT_ID,
    description: data.description,
    id: guid(),
    title: data.title,
  };
}

function addTodo(todo, todos) {
  return [...todos, todo];
}

function updateTodo(id, change, todos) {
  const index = findTodoIndex(id, todos);
  const currentTodo = todos[index];

  const updatedTodo = {
    ...currentTodo,
    ...change,
    lastUpdateDate: new Date(),
    lastUpdateByUserId: ACCOUNT_ID,
    createdDate: currentTodo.createdDate,
    createdByUserId: currentTodo.createdByUserId,
  };

  const result = [...todos];

  result.splice(index, 1, updatedTodo);

  return result;
}

function removeTodo(id, todos) {
  const index = findTodoIndex(id, todos);
  const result = [...todos];
  result.splice(index, 1);
  return result;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// Craft questions to present to users
const createQuestions = [
  {
    type : 'input',
    name : 'title',
    message : 'Enter title ...'
  },
  {
    type : 'input',
    name : 'description',
    message : 'Enter description ...'
  },
];

const updateQuestions = [
  {
    type : 'input',
    name : 'title',
    message : 'Enter new title ...'
  },
  {
    type : 'input',
    name : 'description',
    message : 'Enter new description ...'
  },
];

const commentQuestions = [
  {
    type : 'input',
    name : 'comment',
    message : 'Enter comment ...'
  },
];

program
  .command('create')
  .alias('cr')
  .description('Create new TODO item')
  .action(() => {
    let receivedAnswers;

    prompt(createQuestions)
      .then((answers) => {
        receivedAnswers = answers;
        return getAllTodos();
      })
      .then((todos) => {
        const todo = createTodo(receivedAnswers);
        const updatedTodos = addTodo(todo, todos);
        return saveAllTodos(updatedTodos).then(() => todo.id);
      })
      .then((newTodoId) => console.log(newTodoId))
      .catch((error) => {
        throw error;
      });
  });

program
  .command('update <id>')
  .alias('upd')
  .description('Update TODO item')
  .action((id) => {
    let receiveAnswers;

    prompt(updateQuestions)
      .then(answers => {
        receiveAnswers = answers;
        return getAllTodos();
      })
      .then((todos) => {
        const result = updateTodo(id, receiveAnswers, todos);
        return saveAllTodos(result).then(() => id);
      })
      .then((updatedTodoId) => {
        console.log(updatedTodoId);
      })
      .catch((e) => {
        throw e;
      });
  });

program
  .command('remove <id>')
  .alias('rm')
  .description('Remove TODO item by id')
  .action((id) => {
    getAllTodos()
      .then((todos) => {
        const result = removeTodo(id, todos);
        return saveAllTodos(result).then(() => id);
      })
      .then((updatedTodoId) => {
        console.log(updatedTodoId);
      })
      .catch((e) => {
        throw e;
      });
  });

program
  .command('list')
  .alias('ls')
  .description('List all TODOs')
  .action(() => {
    getAllTodos()
      .then((todos) => {
        console.log(todos);
      })
  });

program
  .command('like <id>')
  .alias('lk')
  .description('Like TODO item')
  .action((id) => {
    getAllTodos()
      .then((todos) => {
        const result = updateTodo(id, { isLiked: true, createdDate: new Date() }, todos);
        return saveAllTodos(result).then(() => id);
      })
      .then((updatedTodoId) => {
        console.log(updatedTodoId);
      })
      .catch((e) => {
        throw e;
      });
  });

program
  .command('comment <id>')
  .alias('cmt')
  .description('Comment TODO item')
  .action((id) => {
    let receivedAnswers;

    prompt(commentQuestions)
      .then((answers) => {
        receivedAnswers = answers;
        return getAllTodos();
      })
      .then((todos) => {
        const result = updateTodo(id, { comment: receivedAnswers.comment }, todos);
        return saveAllTodos(result).then(() => id);
      })
      .then((updatedTodoId) => {
        console.log(updatedTodoId);
      })
      .catch((e) => {
        throw e;
      });
  });

program.parse(process.argv);
