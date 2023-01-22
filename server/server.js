const path = require('path');
const dotenv = require('dotenv').config()

const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
