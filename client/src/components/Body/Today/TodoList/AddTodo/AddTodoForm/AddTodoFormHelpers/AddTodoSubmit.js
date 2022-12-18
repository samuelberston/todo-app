// helper function for onSubmit AddTodoForm

// refactor this so it changes the state to not edit / add mode, instead of reseting the form and after loading the todos
const handleSubmit = (event, values, validator, handleTodo, addTags, resetForm, loadTodos, exit) => {
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
            console.log('load');
            loadTodos();
        })
        .then(() => {
            if (exit !== undefined) {
                console.log('exit')
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
