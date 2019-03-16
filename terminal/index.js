#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const util = require('util');

const { O_WRONLY, O_RDONLY, O_CREAT } = fs.constants;
const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);

const TODO_STATUS = {
  OPEN: 'TODO_STATUS_OPEN',
  IN_PROGRESS: 'TODO_STATUS_IN_PROGRESS',
  DONE: 'TODO_STATUS_DONE',
};

const prompt = questions => inquirer.prompt(questions);

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

const writeToTheFile = (path, todo) => fsWrite(path, JSON.stringify(todo), { flag: O_WRONLY | O_CREAT });
const readFromTheFile = path => fsRead(path, { encoding: 'utf8', flag: O_RDONLY | O_CREAT });


const saveAllTodos = todos => writeToTheFile('./todos.json', todos);
const getAllTodos = () => readFromTheFile('./todos.json')
  .then((data) => data ? JSON.parse(data) : []);

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

    let todo;

    prompt(questions)
      .then(({ title, desc }) => {
        todo = createTodo({ title, desc });
        return getAllTodos();
      })
      .then((todosArray) => {
        const updatedTodosArray = [...todosArray, todo];
        return saveAllTodos(updatedTodosArray);
      })
      .then(() => {
        print(todo);
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

    getAllTodos()
      .then((todosArray) => {
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
