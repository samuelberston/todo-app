// helper function for onSubmit AddTodoForm
const handleSubmit = (event, values, validator, handleTodo, addTags, resetForm, loadTodos) => {
    event.preventDefault();
    let todoId;
    if (validator(event)) {
        console.log('submitting todo...');
        handleTodo(values)
        // for updating todos this is the same tags twice
        .then((todoId) => {
            addTags(values, todoId)
        })
        .then(() => {
            console.log('reset');
            resetForm();
        })
        .then(() => {
            console.log('load');
            loadTodos();
            console.log('loaded?');
        })
        .catch((err) => console.error(err));
    } else {
        alert('form contains errors');
    }
}

export default handleSubmit;
