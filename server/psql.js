const { Client } = require('pg')

//const user = 'sberston';
const user = 'postgres';
const password = 'docker';
const host = 'host.docker.internal';
const port = 5432;
const database = 'todo';

const postgres = new Client({
    host,
    port,
    password,
    database,
    user
});

postgres.connect((err) => {
    if (err) { throw err; }
    console.log(`database connected at ${port}`);
});

module.exports = postgres;
