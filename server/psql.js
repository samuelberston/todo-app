const { Client } = require('pg')

const user = 'postgres';
const host = '172.18.0.2';
const port = 5432;
const database = 'todo';

const postgres = new Client({
    host,
    port,
    password: 'docker',
    user,
    database
});

postgres.connect((err) => {
    if (err) { throw err; }
    console.log(`database connected at ${port}`);
});

module.exports = postgres;
