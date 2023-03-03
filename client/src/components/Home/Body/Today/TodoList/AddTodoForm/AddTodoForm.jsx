import { useAuth0 } from '@auth0/auth0-react';
import React, {useState, useReducer, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { postTodosApi, putTodosApi } from '../../../../../../services/todos.service.js';
import { postTagsApi, postTodosTagsApi, deleteTodosTagsApi } from '../../../../../../services/tags.service.js';
import handleSubmit from './AddTodoFormHelpers/AddTodoSubmit.js';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';
import AddTodoOptions from './AddTodoOptions/AddTodoOptions.jsx';

import styles from './AddTodoForm.module.css';

export const TodosDispatch = createContext(null);

const AddTodoForm = (props) => {
    const [todoHandler, setTodoHandler] = useState(() => () => {return 'todoHandler has not yet been set'});
    const [errors, setErrors] = useState({"field": "error description"});
    const { getAccessTokenSilently } = useAuth0();

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
        taskName: props.task || '',
        description: props.description || '',
        due: props.due || tomorrow(),
        tags: props.tags || [],
        priority: props.priority || 'p4'
    }

    const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

    const {taskName, description, tags, priority, todoId, due} = inputState;

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

    function tomorrow() {
        const today = new Date()
        let tomorrow =  new Date()
        tomorrow.setDate(today.getDate() + 1)
        return tomorrow;
    }

    // move this into a separate file and import directly to the AddTodoFormHelpers/AddTodoSubmit.js helper function
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
        const accessToken = await getAccessTokenSilently();
        let todoId;
        const { data, error } = await postTodosApi(accessToken, inputState);
        if (data) {
          todoId = data;
        }
        if (error) {
          todoId = error;
        }
        return todoId;
    }

    // update Todo with state data
    const updateTodo = async (inputState) => {
        console.log('update todo handler invoked');
        console.log('inputState: ', inputState);
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await putTodosApi(accessToken, todoId, inputState);
        if (data) {
            console.log("Updated todo item with ID: ", todoId);
        }
        if (error) {
            console.error(err);
        }
        return todoId;
    }

    // add tag with state data
    const addTag = async (tag) => {
        const accessToken = await getAccessTokenSilently();
        const { data, error} = await postTagsApi(accessToken, tag.value);
        if (data) {console.log(`Created a tag with ID: ${data}`);}
        if (error) { console.error(error)}
    };

    const addTodosTags = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data, error} = postTodosTagsApi(accessToken,todoId, tagId);
        if (data) {console.log('added tag to todo')}
        if (error) {console.error(error)}
    };

    const deleteTodosTags = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data, error} = deleteTodosTagsApi(accessToken,todoId, tagId);
        if (data) {console.log('deleted tag from todo')}
        if (error) {console.error(error)}
    };

    // resetForm
    const resetForm = () => {
        console.log('resetting form');
        dispatch( {type: 'RESET'} );
    }

    return (
        // <TodosDispatch.Provider value={dispatch}>
            <div id="AddTodoForm" onSubmit={(event) => {handleSubmit(event, inputState, initialInputState, handleValidation, todoHandler, resetForm, props.loadTodos, props.loadTags, props.exit)}}>
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

AddTodoForm.propTypes = {
    mode: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    exit: PropTypes.func,
    loadTodos: PropTypes.func,
    loadTags: PropTypes.func,
    todoId: PropTypes.number,
    task: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    due: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object)
}

AddTodoForm.defaultProps = {
    taskName: '',
    description: '',
    due: tomorrow(),
    tags: [],
    priority: 'p4'
}

export default AddTodoForm;
