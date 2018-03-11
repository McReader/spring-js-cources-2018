# Terminal application

### Prerequisite

You need to have this tools to be installed, before you can setup application:

* NodeJS (^8.9.4)
* npm (^5.7.1)

### Application setup

First you need to install all dependencies

```bash
npm i
```

[Optionally] Create a symbolic link to have an ability to run `todos` command globally

```bash
npm link
```

### Run application

To run application you need to execute commands using following template

```bash
node index.js <command> [...options]
```

for example

```bash
node index.js remove 938355a4-256c-11e8-b467-0ed5f89f718b
```

or if you've created symbolic link you may use `todos` program

```bash
todos remove 938355a4-256c-11e8-b467-0ed5f89f718b
```

### Requirements

The app should provide an API consisting of operations listed below:

1. Create new TODO item.
    
    It should be possible to add a new TODO item by running following command
    ```bash
       todos create
    ``` 
    Then it should be prompted to the user to input TODO title and description.
    
    As soon as all required data was inputted, new todo item should be added to the memory and it's id should be printed to console.
    
2. Read TODO item.
    
    It should be possible to read TODO item using following command:
    ```bash
        todos read <id>
    ```
    Target TODO item should be printed to console in JSON format. In case TODO item doesn't exists, then following error message should be printed to console *"TODO item <id> not found"*.
    
3. Update existing TODO item.
    
    It should be possible to update TODO item using following command:
    ```bash
        todos update <id>
    ```
    
    Then it should be prompted to the user to input new TODO title and description.
    
    As soon as all required data was inputted, todo item should be updated in memory and it's id should be printed to console.
    
4. Remove TODO item.
    
    It should be possible to remove TODO item using following command:
    ```bash
        todos remove <id>
    ```
    
    In case of successful execution TODO item should be removed from the memory, removed items count should be printed to console.

5. List all TODO items.

    It should be possible to list all available TODO items using following command:
    
    ```bash
        todos list
    ```

    TODOs list in JSON format should be printed.

6. Like TODO item.

    It should be possible to mark TODO item as liked using following command:
    
    ```bash
        todos like <id>
    ```
    
    Actual liked status should be printed to console.
    
7. Unlike TODO item.

    It should be possible to remove liked mark using following command:
    
    ```bash
        todos unlike <id>
    ```
    
    Actual liked status should be printed to console.

7. Add comment for TODO item.

    It should be possible to comment todo item using following command
    
    ```bash
        todos comment <id>
    ```

    Then it should be prompted to the user to input comment text.
        
    As soon text was inputted, new comment should be added to the memory, target TODO item's id should be printed to console.

