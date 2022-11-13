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
});

// delete a todo item
router.delete('/todos', (req, res) => {
  const todoId = req.query.todo_id;
  // remove from db
  db.query(`DELETE FROM todos WHERE todo_id = ${todoId}`, (err, data) => {
    if (err) { throw err; }
    res.status(200).send(data);
  });
});

module.exports = router;
