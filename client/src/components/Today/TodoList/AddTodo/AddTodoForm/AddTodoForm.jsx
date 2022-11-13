import React, {useState} from 'react';

const AddTodoForm = (props) => {
    const [values, setValues] = useState({
        taskName: '',
        description: ''
    });
    const [errors, setErrors] = useState({})

    const handleValidation = (event) => {
        let valid = true;
        if (values.taskName == '' || values.taskName == null) {
            valid = false;
            setErrors(errors["taskName"] = "Cannot be empty");
        }
        return valid;
    }

    const handleTaskNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            taskName: event.target.value
        }));
    }

    const handleDescriptionInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            description: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidation(event)) {
            // send post request to /todos API endpoint with request body
            // reset form
        } else {
            alert('form contains errors')
        }
    }

    return (
        <div id="addTodoForm" onSubmit={handleSubmit}>
            <form>
                <input type="text" name="taskName" placeholder="Task name" value={values.taskName} onChange={handleTaskNameInputChange}></input>
                <input type="text" name="description" placeholder="Description" value={values.description} onChange={handleDescriptionInputChange}></input>
                <button onClick={props.clickHandler}> Cancel </button>
                <button type="submit"> Add Task </button>
            </form>
        </div>
    );
}

export default AddTodoForm;
