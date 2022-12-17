// helper function for onSubmit AddTodoForm
const handleSubmit = (event, values, validator, handleTodo, addTags, resetForm, loadTodos) => {
    event.preventDefault();
    let todoId;
    if (validator(event)) {
        handleTodo(values)
        .then((todoId) => {
            addTags(values, todoId)
        })
        .then(() => {
            resetForm();
        })
        .then(() => {
            loadTodos();
        })
        .catch((err) => console.error(err));
    } else {
        alert('form contains errors');
    }
}

export default handleSubmit;
