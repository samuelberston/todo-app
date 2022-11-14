import React, {useState} from 'react';
import axios from 'axios';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';

import styles from './AddTodoForm.module.css';

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
            axios({
                method: 'post',
                url: '/todos',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    ...values
                }
            });
            // reset form
        } else {
            alert('form contains errors')
        }
    }

    return (
        <div onSubmit={handleSubmit}>
            <form id={styles.addTodoForm}>
                <AddTodoInputs taskName={values.taskName} description={values.description} handleTaskNameInputChange={handleTaskNameInputChange} handleDescriptionInputChange={handleDescriptionInputChange} />
                {/* <div id="addTodoInputs">
                    <input type="text" name="taskName" placeholder="Task name" value={values.taskName} onChange={handleTaskNameInputChange}></input>
                    <input type="text" name="description" placeholder="Description" value={values.description} onChange={handleDescriptionInputChange}></input>
                </div> */}
                <div id="addTodoCancelOrSubmit">
                    <button onClick={props.clickHandler}> Cancel </button>
                    <button type="submit"> Add Task </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodoForm;
