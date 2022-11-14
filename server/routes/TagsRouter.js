const express = require('express');
const db = require('../db.js');

const TagsRouter = express.Router();

// get all tags
TagsRouter.get('/tags', (req, res) => {
    // query the db for all the tags
    db.query('SELECT * from tags', (err, data) => {
        // handle any errors
        if (err) {throw err;}
        // send data to the client
        res.status(200).send(data);
    });
});

// create a new tag
TagsRouter.post('/tags', (req, res) => {
    // get the tag name from the req body
    let { tagName } = req.body;
    // add it to the tags table 
    db.query(`INSERT INTO tags (tag) VALUE ("${tagName}")`, (err, data) => {
        // handle any errors
        if (err) {throw err;}
        // send 201 response code
        res.status(201).send(`Created new tag ${tagName}`);
    });
});

// get all todos tags
TagsRouter.get('/todosTags', (req, res) => {
    // query the db for all todosTags
    db.query('SELECT * from todos_tags', (err, data) => {
        // handle any errors
        if (err) { throw err; }
        // send data to client
        res.status(200).send(data);
    });
});

// add a tag to a todo item
TagsRouter.post('/todosTags', (req, res) => {
    // get tag_id and todo_id from req query param
    const { todoId, tagId } = req.query; 
    // add it to the todos_tags table
    db.query(`INSERT INTO todos_tags (todo_id, tag_id) VALUES ("${todoId}", "${tagId}")`, (err, data) => {
        // handle any errors
        if (err) {throw err;}
        res.status(201).send(`Added tag ${tagId} to todo ${todoId}`)
    });
})

module.exports = TagsRouter;
