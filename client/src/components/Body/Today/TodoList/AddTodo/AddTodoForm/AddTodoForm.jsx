import React, {useState, useReducer, createContext, useEffect} from 'react';
import axios from 'axios';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';
import AddTodoOptions from './AddTodoOptions/AddTodoOptions.jsx';

import styles from './AddTodoForm.module.css';

export const TodosDispatch = createContext(null);

const AddTodoForm = (props) => {
    const inputReducer = (state, action) => {
        switch (action.type) {
            case 'TASK':
                return { ...state, taskName: action.val };
            case 'DESCRIPTION':
                return { ...state, description: action.val};
            case 'TAGS':
                return {...state, tags: action.val};
            case 'PRIORITY':
                return {...state, priority: action.val};
            case 'RESET':
                return initialInputState;
            default:
                return state;
        }
    }

    const initialInputState = {
        taskName: props.task || '',
        description: props.description || '',
        tags: props.tags || [],
        priority: props.priority || 'p4',
        todoId: props.todoId || ''
    }

    const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

    const {taskName, description, tags, priority, todoId} = inputState;

    const [mode, setMode] = useState('ADD');

    let handleTodo;

    useEffect(() => {
        setMode(props.mode);
        console.log("mode: ", props.mode);
        switch (props.mode) {
            case 'ADD':
                console.log("ADD");
                handleTodo = postTodo;
                break;
            case 'UPDATE':
                console.log("UPDATE");
                handleTodo = updateTodo;
                break;
        }
    });

    const [errors, setErrors] = useState({
        "field": "error description"
    });



    // validate form has required fields
    const handleValidation = (event) => {
        let valid = true;
        if (taskName == '' || taskName == null) {
            valid = false;
            setErrors((errors) => ({
                ...errors,
                taskName: "cannot be empty"
            }));
        }
        return valid;
    }

    // post Todo with state data
    const postTodo = async (inputState) => {
        let todoId;
        await axios({
            method: 'post',
            url: '/todos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...inputState
            }
        })
        .then(res => todoId = res.data)
        .then(() => {
            console.log("Created todo item with ID: ", todoId);
        })
        return todoId;
    }

    // update Todo with state data
    const updateTodo = async (inputState) => {
        await axios({
            method: 'put',
            url: '/todos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                todo_id: todoId,
                ...inputState
            }
        })
    }

    // refactor this to only call todos-tags API once in code
    const addTags = async(inputState, todoId) => {
        let tagId;
        if (tags.length !== 0) {
            tags.forEach((tag) => {
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
        dispatch({type: 'RESET'});   
    }

    return (
        <TodosDispatch.Provider value={dispatch}>
            <div id="AddTodoForm" onSubmit={(event) => {props.handleSubmit(event, inputState, handleValidation, postTodo, addTags, resetForm, props.loadTodos)}}>
                <form id={styles.addTodoForm}>
                    <AddTodoInputs dispatch={dispatch} taskName={taskName} description={description} />
                    <AddTodoOptions dispatch={dispatch} priority={priority} selectedTags={tags} />
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
