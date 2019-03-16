#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

const { O_WRONLY, O_RDONLY, O_CREAT } = fs.constants;

const TODO_STATUS = {
  OPEN: 'TODO_STATUS_OPEN',
  IN_PROGRESS: 'TODO_STATUS_IN_PROGRESS',
  DONE: 'TODO_STATUS_DONE',
};

const prompt = (questions, callback) => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      callback(answers);
    });
};

const print = (todo) => {
  console.log(todo);
};

const formatDate = (date) => {
  return date.toISOString();
};

const createTodo = ({ title, desc }) => ({
  id: uuidv4(),
  title,
  description: desc,
  createdDate: formatDate(new Date()),
  status: TODO_STATUS.OPEN,
  lastUpdatedDate: null,
});

const writeToTheFile = (path, todo, callback) => {
  fs.writeFile(path, JSON.stringify(todo), { flag: O_WRONLY | O_CREAT }, callback)
};


const readFromTheFile = (path, callback) => {
  fs.readFile(path, { encoding: 'utf8', flag: O_RDONLY | O_CREAT },  callback);
};

const saveAllTodos = (todos, callback) => {
  writeToTheFile('./todos.json', todos, callback);
};

const getAllTodos = (callback) => {
  return readFromTheFile('./todos.json', (err, data) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, data ? JSON.parse(data) : []);
  });
};

program
  .command('create')
  .description('Create new item')
  .action(() => {
    const questions = [
      {
        message: 'Enter title...',
        name: 'title',
      }, {
        message: 'Enter description...',
        name: 'desc',
      },
    ];

    prompt(questions, (answers) => {
      const { title, desc } = answers;

      const todo = createTodo({ title, desc });

      getAllTodos((err, todosArray) => {
        if (err) {
          throw err;
        }

        const updatedTodosArray = [...todosArray, todo];

        saveAllTodos(updatedTodosArray, (err) => {
          if (err) {
            throw err;
          }

          print(todo);
        });
      });
    });
  });

program
  .command('read <id>')
  .description('Read todo item by unique identifier')
  .action((id) => {
    console.log(`Read item ${id}`);
  });

program
  .command('list')
  .description('List all items')
  .option('--status <status>')
  .action(({ status }) => {
    const createStatusPredicate = (status) => {
      switch (status) {
        case TODO_STATUS.OPEN:
          return ({ status }) => status === TODO_STATUS.OPEN;
        case TODO_STATUS.IN_PROGRESS:
          return ({ status }) => status === TODO_STATUS.IN_PROGRESS;
        case TODO_STATUS.DONE:
          return ({ status }) => status === TODO_STATUS.DONE;
        default:
          throw new Error(`Illegal todo status "${status}"`);
      }
    };

    const statusMap = {
      open: TODO_STATUS.OPEN,
      inprogress: TODO_STATUS.IN_PROGRESS,
      done: TODO_STATUS.DONE,
    };

    getAllTodos((error, todosArray) => {
      let resultArray;

      if (status) {
        const parsedStatus = statusMap[status];
        resultArray = todosArray.filter(createStatusPredicate(parsedStatus));
      } else {
        resultArray = todosArray;
      }

      print(resultArray);
    })
  });

program
  .command('update <id>')
  .description('Update an item by id')
  .action((id) => {
    console.log(`Update item with id ${id}`);
  });

program
  .command('status <id> <status>')
  .description('Toggle status')
  .action((id, status) => {
    console.log(`Update items <${id}> status to ${status}`);
  });


program.parse(process.argv);
