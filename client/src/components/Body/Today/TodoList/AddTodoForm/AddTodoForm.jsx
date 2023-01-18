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
            case 'DUE':
                return { ...state, due: action.val};
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
        taskName: props.task,
        description: props.description || '',
        due: props.due || new Date(),
        tags: props.tags || [],
        priority: props.priority || 'p4',
        todoId: props.todoId
    }

    const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

    const {taskName, description, tags, priority, todoId, due} = inputState;

    const [todoHandler, setTodoHandler] = useState(() => () => {return 'todoHandler has not yet been set'});

    useEffect(() => {
        console.log("mode: ", props.mode);
        switch (props.mode) {
            case 'ADD':
                setTodoHandler(() => postTodo);
                break;
            case 'UPDATE':
                setTodoHandler(() => updateTodo);
                break;
        }
    }, [props.mode]);

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

    // resetForm
    const resetForm = async () => {
        dispatch({type: 'RESET'});   
    }

    return (
        // <TodosDispatch.Provider value={dispatch}>
            <div id="AddTodoForm" onSubmit={(event) => {props.handleSubmit(event, inputState, initialInputState, handleValidation, todoHandler, resetForm, props.loadTodos, props.loadTags, props.exit)}}>
                <form id={styles.addTodoForm}>
                    <div id={styles.formInputs}>
                        <AddTodoInputs dispatch={dispatch} taskName={taskName} description={description} />
                        <AddTodoOptions dispatch={dispatch} priority={priority} selectedTags={tags} due={due} />
                    </div>
                    <div id={styles.buttons} >
                        <button id={styles.cancel} onClick={props.clickHandler}> Cancel </button>
                        <button id={styles.submit} type="submit"> {props.submitText} </button>
                    </div>
                </form>
            </div>
        // {/* </TodosDispatch.Provider> */}
    );
}

export default AddTodoForm;
