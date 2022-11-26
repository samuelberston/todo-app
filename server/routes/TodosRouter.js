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
      console.log('data (hopefully todo id): ', data);
      res.sendStatus(201).send(data);
    });
  
});

// delete a todo item
TodosRouter.delete('/todos', (req, res) => {
  const todoId = req.query.todoId;
  // remove from db
  db.query(`DELETE FROM todos WHERE todo_id = ${todoId}`, (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

module.exports = TodosRouter;
