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

    const [state, setState] = useState(1);
    const [todoHandler, setTodoHandler] = useState(() => () => {return 'initialized todoHandler as arrow function YAY!!!'});

    useEffect(() => {
        // setMode(props.mode);
        console.log("mode: ", props.mode);

        setState(a => a * 10);
        switch (props.mode) {
            case 'ADD':
                setTodoHandler(() => postTodo);
                console.log("ADD todoHandler: ", todoHandler);
                break;
            case 'UPDATE':
                console.log("UPDATE");
                setTodoHandler(() => updateTodo);
                console.log("UPDATE todoHandler: ", todoHandler);
                break;
        }
    }, [props.mode, state]);

    const [errors, setErrors] = useState({
        "field": "error description"
    });

    // beef this up with other validation libraries
    // validate form has required fields
    const handleValidation = (event) => {
        console.log('validating that todo has the required fields');
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
        console.log('post todo handler invoked');
        console.log('inputState: ', inputState);
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
        .catch(err => console.error(err));
        return todoId;
    }

    // update Todo with state data
    const updateTodo = async (inputState) => {
        console.log('update todo handler invoked');

        console.log('initialInputState: ', initialInputState);
        console.log('inputState: ', inputState);
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
        .then(() => {
            console.log("Updated todo item with ID: ", todoId);
        })
        .catch(err => {console.error(err)});
        return todoId;
    }

    // refactor this for case when it's update to do to not add the same tags twice .... 
    // refactor this to only call todos-tags API once in code
    // factor this out into its own file
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
        // <TodosDispatch.Provider value={dispatch}>
            <div id="AddTodoForm" onSubmit={(event) => {props.handleSubmit(event, inputState, handleValidation, todoHandler, addTags, resetForm, props.loadTodos, props.exit)}}>
                <form id={styles.addTodoForm}>
                    <AddTodoInputs dispatch={dispatch} taskName={taskName} description={description} />
                    <AddTodoOptions dispatch={dispatch} priority={priority} selectedTags={tags} />
                    <div id="addTodoCancelOrSubmit">
                        <button onClick={props.clickHandler}> Cancel </button>
                        <button type="submit"> {props.submitText} </button>
                    </div>
                </form>
            </div>
        // {/* </TodosDispatch.Provider> */}
    );
}

export default AddTodoForm;
