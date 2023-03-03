import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteTodosApi } from '../../../../../../services/todos.service.js';
import { getTodosTagsApi } from '../../../../../../services/tags.service.js';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';
import TaskContent from './TaskContent/TaskContent.jsx';
import Actions from './Actions/Actions.jsx';

const AddTodoForm = React.lazy(() => import ('../AddTodoForm/AddTodoForm.jsx'));
import AddTodoSubmit from '../AddTodoForm/AddTodoFormHelpers/AddTodoSubmit.js';

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const { todo, loadTodos } = props;
    const { todo_id, priority } = todo;

    const [tags, setTags] = useState({});
    const [updateMode, setUpdateMode] = useState(false);

    const { getAccessTokenSilently } = useAuth0();

    // get all Tags for the todo and set the state
    const loadTodosTags = async () =>  {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await getTodosTagsApi(accessToken, todo_id);
        if (data) {
          setTags(data);
        }

        if (error) {
          setTags(JSON.stringify(error, null, 2));
        }
    }

    useEffect(() => {
        loadTodosTags();
    }, []); 
    


    const onCheck = async (todoId) => {
    console.log('todoId: ', todoId);
    const accessToken = await getAccessTokenSilently();
    const { data, error} = await deleteTodosApi(accessToken, todoId);
    if (data) {
        console.log(`Delete todo with id ${todoId}`);
        loadTodos();
    }
    if (error) {
        console.error(err);
    }
    }

    const modifyUpdateMode = () => {
        setUpdateMode(!updateMode);
    }

    return (
        <div  id="todoItemContainer">
            { updateMode
            // needs loadTags as well ... 
            ? <React.Suspense fallback={<div>'loading...'</ div>}>
                <AddTodoForm mode={"UPDATE"} exit={setUpdateMode} handleSubmit={AddTodoSubmit} loadTodos={loadTodos} loadTags={loadTodosTags} todoId={todo.todo_id} task={todo.task} description={todo.description} priority={todo.priority} due={todo.date_due.split('T')[0]} tags={tags} clickHandler={modifyUpdateMode} submitText={"Save"}/>
            </ React.Suspense>
            : <div id={styles.todoItem}>
                <Grip />
                <Checkbox onCheck={onCheck} todoId={todo_id} priority={priority} />
                <TaskContent task={todo.task} description={todo.description} due={todo.date_due} tags={tags} />
                <Actions loadTodos={loadTodos} modifyUpdateMode={modifyUpdateMode} />
            </div>}
        </div>
    );
}

export default TodoItem;
