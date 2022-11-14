const tagsData = require('/Users/samuelberston/Documents/personal_projects/todo-app/dummydata/tags.js');
const todosData = require('/Users/samuelberston/Documents/personal_projects/todo-app/dummydata/todoItems.js');
const todosTagsData = require('/Users/samuelberston/Documents/personal_projects/todo-app/dummydata/todosTags.js');

// function that takes in a list of todos, tags, and todosTags and return the same
// todos object with each todo item's tags as a field in the object

const tagTodos = (todos, tags, todosTags) => {
    todos.map((todo) => {
        // get the todo id
        const { id } = todo;
        console.log(todo);
        // check all the tags this todo uses
        console.log('todosTags: ', todosTags);
        const tagIdsFromTodoId = getTagIdsFromTodoId(id, todosTags)
        // get the name of the tags
        // add them as a field in the todo item object
    })
}

const getTagIdsFromTodoId = (todoId, todosTags) => {
    let tagIds = [];
    todosTags.forEach((todosTag) => {
        console.log(todosTag);
        if (todosTag["todo_id"] == todoId) {
            tagIds.push(todosTag["tag_id"])
        }
    });
    return tagIds;
}

console.log(getTagIdsFromTodoId(1, todosTagsData));

// console.log(tagTodos(todosData, tagsData. todosTagsData))

module.exports = tagTodos;
