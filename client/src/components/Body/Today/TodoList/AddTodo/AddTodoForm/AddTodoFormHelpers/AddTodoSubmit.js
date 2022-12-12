// helper function for onSubmit AddTodoForm

// refactor function out of scope of component... use callback functions?2
const handleSubmit = (event, values, validator, handleTodo, addTags, resetForm, loadTodos) => {
    event.preventDefault();
    let todoId;
    // convert this into a try/catch Promise chain at some point
    if (validator(event)) {
        // send post request to /todos API endpoint with request body
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
