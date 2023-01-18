const path = require('path');
const dotenv = require('dotenv').config()

const express = require('express');

const TodosRouterPsql = require('./routes/TodosRouterPsql.js');
const TagsRouterPsql = require('./routes/TagsRouterPsql.js')

const app = express();
const port = 8080;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));


// refactor this to run the routes in a separate server, so I can isolate the UI
// then, connect to that server ... and use that as middleware
app.use('/', TodosRouterPsql);
app.use('/', TagsRouterPsql);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
