#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs');
const path = require('path');

program
  .version('0.0.1')
  .description('TODO app');

const storagePath = path.resolve('./store.json');


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
    let answers;

    prompt(createQuestions)
      .then((receivedAnswers) => {
        answers = receivedAnswers;
        return openFile().then()
      })
      .then((fd) => {
        return readFile();
      })
      .then((data) => {
        return JSON.parse(data);
      })
      .then((obj) => {
        obj.todos.push({
          id: guid(),
          title: answers.title,
          description: answers.description,
        });
        return obj;
      })
      .then((updatedObj) => {
        return JSON.stringify(updatedObj);
      })
      .then((data) => {
        writeFile(data);
      })
      .catch((error) => {
        console.error(`error: ${error}`);
      });
  });

program
  .command('update <id>')
  .alias('upd')
  .description('Update TODO item')
  .action((id) => {
    prompt(updateQuestions).then(answers => {
      // TODO update todo
    });
  });

program
  .command('remove <id>')
  .alias('rm')
  .description('Remove TODO item by id')
  .action((id) => {
    // TODO remove item
  });

program
  .command('list')
  .alias('ls')
  .description('List all TODOs')
  .action(() => {
    // TODO write todos list to the cli
  });

program
  .command('like <id>')
  .alias('lk')
  .description('Like TODO item')
  .action((id) => {
    // TODO mark todo item as liked
  });

program
  .command('comment <id>')
  .alias('cmt')
  .description('Comment TODO item')
  .action((id) => {
    prompt(commentQuestions).then(answers => {
      // TODO comment for todo item
    });
  });

program.parse(process.argv);
