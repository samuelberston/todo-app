// helper function for onSubmit AddTodoForm

// need to add load todos tags
const handleSubmit = (event, values, validator, handleTodo, addTags, resetForm, loadTodos, exit) => {
    event.preventDefault();
    let todoId;
    if (validator(event)) {
        console.log('submitting todo...');
        handleTodo(values)
        // for updating todos this is the same tags twice
        .then((todoId) => {
            console.log('adding todos');
            addTags(values, todoId)
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
