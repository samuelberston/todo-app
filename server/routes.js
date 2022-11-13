const express = require('express');
const db = require('./db.js');

const router = express.Router();

// receive all todos from the db
router.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

// create a new todo item
router.post('/todos', (req, res) => {
  // insert new todo into db
  const { task, description, date_created, date_due, priority } = req.body;

  db.query(
    `INSERT INTO todos (task, description, date_created, date_due, priority) 
    VALUES ("${task}", "${description}", "${date_created}", "${date_due}", "${priority}")`,
    (err, data) => {
      if (err) { throw err; }
      res.sendStatus(201).send();
    });
});

// delete a todo item
router.delete('/todos', (req, res) => {
  const todoId = req.query.todoId;
  // remove from db
  db.query(`DELETE FROM todos WHERE todo_id = ${todoId}`, (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

module.exports = router;
