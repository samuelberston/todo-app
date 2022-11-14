import React, {useState, useEffect} from 'react';
import axios from 'axios';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';

import styles from './AddTodoForm.module.css';

const AddTodoForm = (props) => {
    const [values, setValues] = useState({
        taskName: '',
        description: ''
    });
    const [errors, setErrors] = useState({
        "field": "error description"
    });
    const [alert, setAlert] = useState(false);



    const handleValidation = (event) => {
        console.log('handling validation');
        console.log("event: ", event);
        console.log("values: ", values);
        let valid = true;
        if (values.taskName == '' || values.taskName == null) {
            console.log('checking if taskName is empty');
            valid = false;
            setErrors((errors) => ({
                ...errors,
                taskName: "cannot be empty"
            }));
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
            setValues(() => ({
                taskName: '',
                description: ''
            }));

        } else {
            alert('form contains errors');
        }
        props.loadTodos();
    }

    return (
        <div onSubmit={handleSubmit}>
            <form id={styles.addTodoForm}>
                <AddTodoInputs taskName={values.taskName} description={values.description} handleTaskNameInputChange={handleTaskNameInputChange} handleDescriptionInputChange={handleDescriptionInputChange} />
                <div id="addTodoCancelOrSubmit">
                    <button onClick={props.clickHandler}> Cancel </button>
                    <button type="submit"> Add Task </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodoForm;
