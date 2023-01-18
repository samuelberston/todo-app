const express = require('express');
const postgres = require('../psql.js');
const { body, validationResult } = require('express-validator');

const TodosRouterPsql = express.Router();

// receive all todos from the db
TodosRouterPsql.get('/todos', (req, res) => {
  postgres.query('SELECT * FROM todo.todos ORDER BY todo_id;', (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data.rows);
  });
});

// create a new todo item
TodosRouterPsql.post('/todos', (req, res) => {
  console.log('post todo');
  // insert new todo into db
  let { taskName, description, date_created, due, priority } = req.body;

  console.log("todo data: ", req.body);

  if (description == undefined) { description = "" }
  if (date_created == undefined) { date_created = "" }
  if (due == undefined) {
    date_due = ""
  } else {
    console.log('validating due date');
    body(due).isDate()
  }
  if (priority == undefined) { priority = "" }

  console.log("todo query: ", `INSERT INTO todo.todos (task, description, date_created, date_due, priority)
  VALUES ('${taskName}', "${description}", "${date_created}", "${due}", "${priority}") RETURNING todo_id`)
  const query = ''

// refactor SQL query out of the route and use %1, %2 to pass the values instead....
  postgres.query(
    `INSERT INTO todo.todos (task, description, date_created, date_due, priority)
    VALUES ('${taskName}', '${description}', '${date_created}', '${due}', '${priority}') RETURNING todo_id;`,
    (err, data) => {
      if (err) { throw err; }
      const todoId = data.rows[0].todo_id;
      console.log('created new todo with id: ', todoId);
      res.status(201).send([todoId]);
    });
});

// update a todo item
TodosRouterPsql.put('/todos', (req, res) => {
  console.log('put todo');
  console.log("req.body: ", req.body);
  let { todo_id, taskName, description, date_created, due, priority } = req.body;

  if (description == undefined) { description = ""}
  if (date_created == undefined) { date_created = ""}
  if (due == undefined) { due = ""}
  if (priority == undefined) { priority = ""}
  
  console.log('update todo query: ', `UPDATE todo.todos
  SET task = '${taskName}', description = '${description}', date_created = '${date_created}', date_due= '${due}', priority = '${priority}'
  WHERE todo_id = ${todo_id}`);

  postgres.query(
    `UPDATE todo.todos
    SET task = '${taskName}', description = '${description}', date_created = '${date_created}', date_due= '${due}', priority = '${priority}'
    WHERE todo_id = ${todo_id}`,
    (err, data) => {
      if (err) { throw err; }
      res.status(204).json(todo_id);
    });
});

// delete a todo item
TodosRouterPsql.delete('/todos', (req, res) => {
  const todoId = req.query.todoId;
  // remove from db
  postgres.query(`DELETE FROM todo.todos_tags WHERE todo_id = ${todoId};
  DELETE FROM todo.todos WHERE todo_id = ${todoId};`, (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

module.exports = TodosRouterPsql;
