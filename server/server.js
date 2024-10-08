const path = require('path');
const dotenv = require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

//app.use((req, res, next) => {
//  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8443");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/app', express.static(path.join(__dirname, '../public')));
app.use('/profile', express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
