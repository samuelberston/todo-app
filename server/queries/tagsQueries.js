// write the queries with the arguments using string interpolation

// get all /tags
const getAllTags = 'SELECT * from todo.tags'

// get /tags query with todoId query param
const getTagsForTodoId = `SELECT * FROM todo.tags
    JOIN todo.todos_tags ON todo.tags.tag_id = todo.todos_tags.tag_id
    WHERE todo.todos_tags.todo_id = $1
`

// post /tags query
const postTag = `INSERT INTO todo.tags (tag) VALUES ($1) RETURNING tag_id;`

// post todos-tags query

// delete /todos-tags query

module.exports = {
    getAllTags,
    getTagsForTodoId,
    postTag
}
// yay