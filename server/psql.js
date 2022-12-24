const { Client } = require('pg')

const user = 'sberston';
const host = 'localhost';
const port = 5432;
const database = 'todo';

const postgres = new Client({
    host,
    port,
    user,
//    database
});

postgres.connect((err) => {
    if (err) { throw err; }
    console.log(`database connected at ${port}`);
});

module.exports = postgres;
