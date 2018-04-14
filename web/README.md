# Web application

### Prerequisite

You need to have this tools to be installed, before you can setup application:

* NodeJS (^8.9.4)
* npm (^5.7.1)

### Application setup

First you need to install all dependencies

```bash
npm i
```

### Run application in development mode

To run application you need to execute commands using following template

```bash
npm start
```

### Requirements

#### Business logic

All business logic from "terminal app" should be migrated.

#### Item

A todo item has three possible interactions:
  * Clicking the checkbox marks the todo as complete by updating its completed value and toggling the class completed on its parent ```<li>```
  * Clicking on the "edit" icon should trigger an edit action (doesn't matter how editing will be implemented. e.g separate form or in-place editing)
  * Clicking on the "delete" button should remove todo item

#### Validation

Todo Title is required. It shouldn't be possible to create or edit todo item without providing it.

#### No todos

When there are no todos, the placeholder with text "No todos" should be displayed.

#### Persistence

Your app should dynamically persist the todos to browser's local storage.

#### Reliability

Core functionality should be covered by tests.
