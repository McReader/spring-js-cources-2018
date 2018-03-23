#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs');
const path = require('path');
const util = require('util');

program
  .version('0.0.1')
  .description('This is a TODO application');

const storagePath = path.resolve('./store.json');
const ACCOUNT_ID = 1;

const fsOpen = util.promisify(fs.open);
const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);


function getAllTodos() {
  return fsOpen(storagePath, 'a+')
    .then(() => {
      return fsReadFile(storagePath, 'utf8');
    })
    .then((data) => {
      return JSON.parse(data);
    })
    .then((storage) => {
      return storage.todos || [];
    });
}

function saveAllTodos(todos) {
  return fsWriteFile(storagePath, JSON.stringify({ todos }));
}


function findTodoIndex(id, todos) {
  return todos.findIndex((todo) => todo.id === id)
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function inform(...args) {
  console.info(...args);
}


function createTodo(data) {
  const now = new Date();
  return {
    createdDate: now,
    createdByUserId: ACCOUNT_ID,
    id: guid(),
    lastUpdateDate: now,
    lastUpdateByUserId: ACCOUNT_ID,
    ...data,
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
  .description('Create new TODO item')
  .action(() => {
    let receivedAnswers;

    prompt(createQuestions)
      .then((answers) => {
        receivedAnswers = answers;
        return getAllTodos();
      })
      .then((todos) => {
        const todo = createTodo({
          title: receivedAnswers.title,
          description: receivedAnswers.description,
        });
        const updatedTodos = addTodo(todo, todos);
        return saveAllTodos(updatedTodos).then(() => todo.id);
      })
      .then(inform)
      .catch((error) => {
        throw error;
      });
  });

program
  .command('update <id>')
  .description('Update TODO item')
  .action((id) => {
    let receiveAnswers;

    prompt(updateQuestions)
      .then((answers) => {
        receiveAnswers = answers;
        return getAllTodos();
      })
      .then((todos) => {
        const result = updateTodo(id, {
          title: receiveAnswers.title,
          description: receiveAnswers.description,
        }, todos);
        return saveAllTodos(result).then(() => id);
      })
      .then(inform)
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
      .then(inform)
      .catch((e) => {
        throw e;
      });
  });

program
  .command('list')
  .alias('ls')
  .description('List all TODOs')
  .action(() => {
    getAllTodos().then(inform)
  });

program
  .command('like <id>')
  .description('Like TODO item')
  .action((id) => {
    getAllTodos()
      .then((todos) => {
        const result = updateTodo(id, { isLiked: true }, todos);
        return saveAllTodos(result).then(() => id);
      })
      .then(inform)
      .catch((e) => {
        throw e;
      });
  });

program
  .command('comment <id>')
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
      .then(inform)
      .catch((e) => {
        throw e;
      });
  });

program.parse(process.argv);
