// helper function for onSubmit AddTodoForm

import AddTagsHelper from './AddTagsHelper.js';

// need to add load todos tags
const handleSubmit = (event, values, validator, handleTodo, addTags, resetForm, loadTodos, exit) => {
    event.preventDefault();
    let todoId;
    if (validator(event)) {
        console.log('submitting todo...');
        handleTodo(values)
        // check if the tag is NEW... or remove the existing tags and update them ...
        .then((todoId) => {
            console.log('adding tags');
            AddTagsHelper(values.tags, todoId)
        })
        .then(() => {
            console.log('load');
            loadTodos();
        })
        .then(() => {
            if (exit !== undefined) {
                console.log('exit form');
                exit();
            }
        })
        .then(() => {
            console.log('reset');
            resetForm();
        })
        .catch((err) => console.error(err));
    } else {
        alert('form contains errors');
    }
}

export default handleSubmit;
