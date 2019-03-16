#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

const { O_APPEND } = fs.constants;

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
  fs.writeFile(path, JSON.stringify(todo), { flag: O_APPEND }, callback)
};

const print = (todo) => {
  console.log(todo);
};

program
  .command('create', 'Create new item')
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

      readFromTheFile('./todos.json', (todosArray) => {
        const updatedTodosArray = [...todosArray, todo];

        writeToTheFile('./todos.json', updatedTodosArray, () => {
          print(todo);
        });
      });
    });
  });

program
  .command('read <id>', 'Read todo item by unique identifier')
  .action((id) => {
    console.log(`Read item ${id}`);
  });

program
  .command('list')
  .option('--status <status>')
  .action((cmd) => {
    console.log(`List items with status ${status}`);
  });

program
  .command('update <id>')
  .action((id) => {
    console.log(`Update item with id ${id}`);
  });

program
  .command('status <id> <status>')
  .action((id, status) => {
    console.log(`Update items <${id}> status to ${status}`);
  });


program.parse(process.argv);
