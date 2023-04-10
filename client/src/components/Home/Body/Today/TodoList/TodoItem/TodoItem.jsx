import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {UserUUIDContext} from '../../../UserUUIDContext.js';
import { deleteTodosApi } from '../../../../../../services/todos.service.js';
import { getTodosTagsApi, deleteTodosTagsApi } from '../../../../../../services/tags.service.js';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';
import TaskContent from './TaskContent/TaskContent.jsx';
import Actions from './Actions/Actions.jsx';

const AddTodoForm = React.lazy(() => import ('../AddTodoForm/AddTodoForm.jsx'));

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const [tags, setTags] = useState({});
    const [updateMode, setUpdateMode] = useState(false);
    const userUUID = useContext(UserUUIDContext);
    const { getAccessTokenSilently, user } = useAuth0();

    const { todo, loadTodos } = props;
    const { todo_id, priority } = todo;

    // get all Tags for the todo and set the state
    const loadTodosTags = async () =>  {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await getTodosTagsApi(accessToken, todo_id);
        if (data) {
          setTags(data);
          return {
            tags: data
          };
        }

        if (error) {
          setTags(JSON.stringify(error, null, 2));
          throw new Error('Failed to load tags');
        }
    }

    useEffect(() => {
        loadTodosTags();
    }, []); 

    const onCheck = async (todoId) => {
        console.log('todoId: ', todoId);
        const accessToken = await getAccessTokenSilently();
        let { data, error } = await deleteTodosTagsApi(accessToken, todoId);
        if (data) {
            const { data, error} = await deleteTodosApi(accessToken, todoId, userUUID);
            if (data) {
                console.log(`Deleted todo with id ${todoId}`);
                loadTodos();
            }
            if (error) {
                console.error(error);
            }
        }
        if (error) { console.error(error); }
    }

    const modifyUpdateMode = () => {
        setUpdateMode(!updateMode);
    }

    return (
        <div  id="todoItemContainer">
            { updateMode
            ? <React.Suspense fallback={<div>'Loading...'</ div>}>
                <AddTodoForm mode={"UPDATE"} exit={setUpdateMode} loadTodos={loadTodos} loadTags={loadTodosTags} todoId={todo.todo_id} task={todo.task} description={todo.description} priority={todo.priority} due={todo.date_due.split('T')[0]} tags={tags} list={{list_name: todo.list_name, list_uuid: todo.list_uuid}} clickHandler={modifyUpdateMode} submitText={"Save"}/>
            </ React.Suspense>
            : <div id={styles.todoItem}>
                <Grip />
                <Checkbox onCheck={onCheck} todoId={todo_id} priority={priority} />
                <TaskContent task={todo.task} description={todo.description} due={todo.date_due} tags={tags} listName={todo.list_name} />
                <Actions loadTodos={loadTodos} modifyUpdateMode={modifyUpdateMode} />
            </div>}
        </div>
    );
}

export default TodoItem;
