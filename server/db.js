const mysql = require('mysql2');

const port = 3306;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "",
  database: 'TODO',
  port,
  multipleStatements: true
});

db.connect((err) => {
  if (err) { throw err; }
  console.log(`database connected at ${port}`);
});

db.query('SELECT * FROM TODOS;', (err, res) => {
  console.log(err, res)
});

module.exports = db;
