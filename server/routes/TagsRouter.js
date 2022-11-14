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
        res.status(200).send(data)
    });
});

// create a new tag
TagsRouter.post('/tags', (req, res) => {
    // get the tag name from the req body
    // add it to the tags table 
    // handle any errors
    // send 201 response code

});

// add a tag to a todo item
TagsRouter.post('/todosTags', (req, res) => {
    // get todo_id from req query param
    // get tag_id from the req query param
    // add it to the todos_tags table
    // handle any errors
    // send 201 response code
})

module.exports = TagsRouter;
