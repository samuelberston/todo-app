import React, {useState, useEffect} from 'react';
import axios from 'axios';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';
import AddTodoOptions from './AddTodoOptions/AddTodoOptions.jsx';

import styles from './AddTodoForm.module.css';

// refactor this component to make it reusable 
// so it can be used both to add a todo and to update an existing todo
// also consider moving it under the TodoList directory for better access

const AddTodoForm = (props) => {
    const [values, setValues] = useState({
        taskName: props.taskName || '',
        description: props.description || '',
        tags: props.tags || [],
        // due date
        priority: props.priority || 'p4'
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

    // fix this bc the component also needs the todoIds
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

    const handlePriorityInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            priority: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let todoId;
        // convert this into a try/catch Promise chain at some point
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
            })
            .then(res => todoId = res.data)
            .then(() => {
                console.log("Created todo item with ID: ", todoId);
            })
            .then(() => {
                let tagId;
                // if the todo has tags, we need to add the tags to to the todos_tags table
                if (values.tags.length !== 0) {
                    values.tags.forEach((tag) => {
                        // if the tag is NEW (__isNew__ == true), create a new tag and add it to the todos_tags table
                        if (tag.__isNew__) {
                            axios({
                                method: 'post',
                                url: '/tags',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: {
                                    tagName: tag.value
                                }
                            })
                            .then(res => tagId = res.data)
                            .then(() => {console.log("Created a tag with ID: ", tagId)})
                            // add the new tag to the todos_tags table
                            .then(() => {
                                axios({
                                    method: 'post',
                                    url: '/todos-tags',
                                    headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    data: {
                                        todoId,
                                        tagId
                                    }
                                }).catch((err) => console.error(err));
                            }).catch((err) => console.error(err));
                        // if the tag is NOT new, JUST add it to the todos_tags table
                        } else {
                            axios({
                                method: 'post',
                                url: '/todos-tags',
                                headers: {
                                        'Content-Type': 'application/json'
                                    },
                                data: {
                                    todoId,
                                    tagId: tag.tag_id
                                }
                            }).catch((err) => console.error(err));
                        }
                    });
                }
            })
            .catch((err) => console.error(err));

            // reset form
            setValues(() => ({
                taskName: '',
                description: '',
                tags: []
            }));
        } else {
            alert('form contains errors');
        }
        props.loadTodos();
    }

    return (
        <div id="AddTodoForm" onSubmit={handleSubmit}>
            <form id={styles.addTodoForm}>
                <AddTodoInputs taskName={values.taskName} description={values.description} handleTaskNameInputChange={handleTaskNameInputChange} handleDescriptionInputChange={handleDescriptionInputChange} />
                <AddTodoOptions priority={values.priority} selectedTags={values.tags} handleTagsInputChange={handleTagsInputChange} handlePriorityInputChange={handlePriorityInputChange} />
                <div id="addTodoCancelOrSubmit">
                    <button onClick={props.clickHandler}> Cancel </button>
                    <button type="submit"> Add Task </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodoForm;
