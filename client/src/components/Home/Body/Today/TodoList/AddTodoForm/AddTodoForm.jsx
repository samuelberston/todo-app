import { useAuth0 } from '@auth0/auth0-react';
import React, {useState, useReducer, useContext, createContext, useEffect} from 'react';
import {UserUUIDContext} from '../../../UserUUIDContext.js';
import PropTypes from 'prop-types';
import { postTodosApi, putTodosApi } from '../../../../../../services/todos.service.js';
import { postTagsApi, postTodosTagsApi, deleteTodosTagsApi } from '../../../../../../services/tags.service.js';
import handleSubmit from './AddTodoFormHelpers/AddTodoSubmit.js';

import AddTodoInputs from './AddTodoInputs/AddTodoInputs.jsx';
import AddTodoOptions from './AddTodoOptions/AddTodoOptions.jsx';

import styles from './AddTodoForm.module.css';

const tomorrow = () => {
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow;
}

const AddTodoForm = (props) => {
    const [todoHandler, setTodoHandler] = useState(() => () => {return 'todoHandler has not yet been set'});
    const [errors, setErrors] = useState({"field": "error description"});
    const { getAccessTokenSilently, user } = useAuth0();
    const userUUID = useContext(UserUUIDContext);

    const inputReducer = (state, action) => {
        switch (action.type) {
            case 'DESCRIPTION':
                return { ...state, description: action.val};
            case 'DUE':
                return { ...state, due: action.val};
            case 'LIST':
                return { ...state, list: action.val};
            case 'PRIORITY':
                return {...state, priority: action.val};
            case 'RESET':
                return initialInputState;
            case 'TAGS':
                return {...state, tags: action.val};
            case 'TASK':
                return { ...state, taskName: action.val };
            default:
                return state;
        }
    }

    const initialInputState = {
        description: props.description || '',
        due: props.due || tomorrow(),
        list: props.list || 'set default list',
        priority: props.priority || 'p4',
        tags: props.tags || [],
        taskName: props.task || '',
        todoId: props.todoId || null,
        user_uuid: userUUID
    }

    const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

    const {taskName, description, tags, priority, todoId, due, list} = inputState;

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

    // post Todo with state data
    const postTodo = async (inputState) => {
        console.log('post todo handler invoked');
        console.log('inputState: ', inputState);
        const accessToken = await getAccessTokenSilently();
        let todoId;
        const { data, error } = await postTodosApi(accessToken, inputState);
        if (data) {
          return {
            todoId: data[0],
            error: null
          }
        }
        if (error) {
          return {
            todoId: null,
            error
          }
        }
    };

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
        return {todoId};
    }

    // add tag with state data
    const addTag = async (tag) => {
        const accessToken = await getAccessTokenSilently();
        const { data, error} = await postTagsApi(accessToken, tag.value);
        if (data) {
            console.log(`Created a tag with ID: ${data.tagId}`);
            return {
                data: data.tagId,
                error: null
            };
        }
        if (error) {
            console.error(error);
            return {
                data: null,
                error
            }
        }
    };

    const addTodosTags = async (todoId, tagId) => {
        const accessToken = await getAccessTokenSilently();
        console.log('invoking postTodosTagsApi function');
        const { data, error } = await postTodosTagsApi(accessToken,todoId, tagId);
        console.log('data: ', data);
        if (data) {
            console.log('added tag to todo')
            return {
                data,
                error: null
            };
        }
        if (error) {
            console.error(error);
            return {
                data: null,
                error
            };
        }
    };

    const deleteTodosTags = async (todoId, tagId) => {
        const accessToken = await getAccessTokenSilently();
        console.log('invoking deleteTodosTagsApi function');
        const { data, error} = await deleteTodosTagsApi(accessToken, todoId, tagId);
        if (data) {
            console.log('deleted tag from todo');
            return data;
        }
        if (error) {
            console.error(error);
            throw new Error('Failed to delete tag with id: ', tagId, ' from todo with id: ', todoId);
        }
    };

    // resetForm
    const resetForm = () => {
        console.log('resetting form');
        dispatch( {type: 'RESET'} );
    }

    return (
        // <TodosDispatch.Provider value={dispatch}>
            <div id="AddTodoForm" onSubmit={(event) => {handleSubmit(event, inputState, initialInputState, setErrors, todoHandler, addTag, addTodosTags, deleteTodosTags, props.loadTodos, props.loadTags, props.exit, resetForm)}}>
                <form id={styles.addTodoForm}>
                    <div id={styles.formInputs}>
                        <AddTodoInputs dispatch={dispatch} taskName={taskName} description={description} />
                        <AddTodoOptions dispatch={dispatch} priority={priority} selectedTags={tags} due={due} list={list} />
                    </div>
                    <div id={styles.buttons} >
                        <button id={styles.cancel} onClick={props.exit}> Cancel </button>
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
    exit: PropTypes.func.isRequired,
    loadTodos: PropTypes.func,
    loadTags: PropTypes.func,
    todoId: PropTypes.number,
    task: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    // fix this at some point
    due: PropTypes.any,
    tags: PropTypes.arrayOf(PropTypes.object)
}

AddTodoForm.defaultProps = {
    taskName: '',
    description: '',
    due: tomorrow(),
    tags: [],
    priority: 'p4',
    todoId: null,
}

export default AddTodoForm;
