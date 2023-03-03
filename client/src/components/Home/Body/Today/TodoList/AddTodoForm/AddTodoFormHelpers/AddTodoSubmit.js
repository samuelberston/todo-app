// helper function for onSubmit AddTodoForm
import AddTagsHelper from './AddTagsHelper.js';

// need to add load todos tags
const handleSubmit = (event, values, initialValues, validator, handleTodo, resetForm, loadTodos, loadTags, exit) => {
    event.preventDefault();
    let todoId;
    if (!validator(event)) {
        alert('form contains errors');
        resetForm();
    } else {
        console.log('handling todo');
        // either postTodo or updateTodo
        handleTodo(values)
        // add new tags, add tags to todo, delete tags from todo
        .then((todoId) => {
            console.log('handling tags');
            // addTag, addTodosTags, deleteTodosTags
            AddTagsHelper(values.tags, initialValues.tags, todoId)
        })

        // update state
        .then(() => {
            console.log('load todos');
            loadTodos();
        })
        .then(() => {
            if (loadTags !== undefined) {
                console.log('load tags');
                loadTags();
            }
        })

        // exit and reset form
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
    }
}

export default handleSubmit;
