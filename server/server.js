const path = require('path');
const dotenv = require('dotenv').config()

const express = require('express');

const TodosRouter = require('./routes/TodosRouter.js');
const TagsRouter = require('./routes/TagsRouter.js');

const TodosRouterPsql = require('./routes/TodosRouterPsql.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', TodosRouterPsql);
app.use('/', TagsRouter);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
