import React, {useState, useEffect} from 'react';
import axios from 'axios';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';
import AddTodoOptions from './AddTodoOptions/AddTodoOptions.jsx';

import styles from './AddTodoForm.module.css';

const AddTodoForm = (props) => {
    const [values, setValues] = useState({
        taskName: '',
        description: '',
        tags: []
        // due date
        // priority
    });
    const [errors, setErrors] = useState({
        "field": "error description"
    });
    const [alert, setAlert] = useState(false);

    const handleValidation = (event) => {
        let valid = true;
        if (values.taskName == '' || values.taskName == null) {
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

    const handleTagsInputChange = (selectedTags) => {
        setValues((values) => ({
            ...values,
            tags: selectedTags
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

            // if the todo has tags, we need to add the tags to to the todos_tags table
            if (values.tags.length !== 0) {
                console.log('tags: ', values.tags);
                // axios({
                // method: 'post',
                // url: '/todos-tags',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // data: {
                //     // an array containing all the relationships between the todo item and the tag.........
                //     // or just the todo Id and an array containing all the tag ids
                // }
                // });
            }

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
                <AddTodoOptions handleTagsInputChange={handleTagsInputChange} />
                <div id="addTodoCancelOrSubmit">
                    <button onClick={props.clickHandler}> Cancel </button>
                    <button type="submit"> Add Task </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodoForm;
