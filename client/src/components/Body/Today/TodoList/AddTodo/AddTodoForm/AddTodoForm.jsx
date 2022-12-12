import React, {useState, useReducer, createContext, useEffect} from 'react';
import axios from 'axios';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';
import AddTodoOptions from './AddTodoOptions/AddTodoOptions.jsx';

import styles from './AddTodoForm.module.css';

// refactor this component to make it reusable 
// so it can be used both to add a todo and to update an existing todo
// also consider moving it under the TodoList directory for better access

export const TodosDispatch = createContext(null);

const AddTodoForm = (props) => {
    const [values, setValues] = useState({
        taskName: props.task || '',
        description: props.description || '',
        tags: props.tags || [],
        // due date
        priority: props.priority || 'p4',
        todoId: props.todoId || ''
    });

    const inputReducer = (state, action) => {
        switch (action.type) {
            case 'TASK':
                console.log('update TASK name');
                return { ...state, taskName: action.val };
            case 'DESCRIPTION':
                return { ...state, description: action.val};
            case 'TAGS':
                return {...state, tags: action.val};
            case 'PRIORITY':
                return {...state, priority: action.val};
            default:
                return state;
        }
    }

    const [inputState, dispatch] = useReducer(inputReducer, {
        taskName: props.task || '',
        description: props.description || '',
        tags: props.tags || [],
        // due date
        priority: props.priority || 'p4',
        todoId: props.todoId || ''
    });
    const {taskName, description, tags, priority} = inputState;

    const [errors, setErrors] = useState({
        "field": "error description"
    });
    const [alert, setAlert] = useState(false);

    // validate form has required fields
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

    // post Todo with state data
    const postTodo = async (values) => {
        let todoId;
        await axios({
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
        return todoId;
    }

    // update Todo with state data
    const updateTodo = async (values) => {
        await axios({
            method: 'put',
            url: '/todos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                todo_id: values.todoId,
                ...values
            }
        })
    }

    const addTags = async(values, todoId) => {
        let tagId;
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
    }

    // resetForm
    const resetForm = async () => {
        setValues(() => ({
            taskName: '',
            description: '',
            tags: [],
            priority: 'p4'
        }));    
    }

    // update state with input values handlers

    // const handlePriorityInputChange = (event) => {
    //     event.persist();
    //     setValues((values) => ({
    //         ...values,
    //         priority: event.target.value
    //     }));
    // }

    return (
        <TodosDispatch.Provider value={dispatch}>
            <div id="AddTodoForm" onSubmit={(event) => {props.handleSubmit(event, values, handleValidation, postTodo, addTags, resetForm, props.loadTodos)}}>
                <form id={styles.addTodoForm}>
                    <AddTodoInputs dispatch={dispatch} taskName={taskName} description={description} />
                    <AddTodoOptions dispatch={dispatch} priority={priority} selectedTags={tags} handlePriorityInputChange={handlePriorityInputChange} />
                    <div id="addTodoCancelOrSubmit">
                        <button onClick={props.clickHandler}> Cancel </button>
                        <button type="submit"> {props.submitText} </button>
                    </div>
                </form>
            </div>
        </TodosDispatch.Provider>
    );
}

export default AddTodoForm;
