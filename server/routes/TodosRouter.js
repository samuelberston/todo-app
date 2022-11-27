const express = require('express');
const db = require('../db.js');

const TodosRouter = express.Router();

// receive all todos from the db
TodosRouter.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

// create a new todo item
TodosRouter.post('/todos', (req, res) => {
  // insert new todo into db
  let { taskName, description, date_created, date_due, priority } = req.body;

  console.log("todo data: ", req.body);
  console.log("todo query: ", `INSERT INTO todos (task, description, date_created, date_due, priority) 
  VALUES ("${taskName}", "${description}", "${date_created}", "${date_due}", "${priority}")`)

  if (description == undefined) { description = ""}
  if (date_created == undefined) { date_created = ""}
  if (date_due == undefined) { date_due = ""}
  if (priority == undefined) { priority = ""}

  db.query(
    `INSERT INTO todos (task, description, date_created, date_due, priority) 
    VALUES ("${taskName}", "${description}", "${date_created}", "${date_due}", "${priority}");
    SELECT LAST_INSERT_ID();`,
    (err, data) => {
      if (err) { throw err; }
      const todoId = data[1][0]['LAST_INSERT_ID()']
      console.log('created new todo with id: ', todoId);
      res.status(201).json(todoId);
    });
  
});

// FIX THIS -- I also need to delete the todos_tags entry when I delete a todo
// delete a todo item
TodosRouter.delete('/todos', (req, res) => {
  const todoId = req.query.todoId;
  // remove from db
  db.query(`DELETE FROM todos_tags WHERE todo_id = ${todoId};
  DELETE FROM todos WHERE todo_id = ${todoId};`, (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

module.exports = TodosRouter;
