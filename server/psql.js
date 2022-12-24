const { Client } = require('pg')

const user = 'sberston';
const host = '127.0.0.1';
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
