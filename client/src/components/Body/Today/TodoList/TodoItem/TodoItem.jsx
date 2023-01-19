import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';
import TaskContent from './TaskContent/TaskContent.jsx';
import Actions from './Actions/Actions.jsx';

import AddTodoForm from '../AddTodoForm/AddTodoForm.jsx';
import AddTodoSubmit from '../AddTodoForm/AddTodoFormHelpers/AddTodoSubmit.js';

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const { todo, loadTodos } = props;
    const { todo_id, priority } = todo;

    const [tags, setTags] = useState({});
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        loadTags();
    }, []); 
    
    // get all Tags for the todo and set the state
    const loadTags = () =>  {
        console.log('loading tags');
        axios.get(`/tags?todoId=${todo_id}`)
            .then(res => {
                setTags(res.data)
            })
            .catch(err => console.error(err));
    }

    const onCheck = (todoId) => {
    console.log('todoId: ', todoId);
        axios.delete(`/todos-tags/?todoId=${todoId}`)
            .then(() => {
            console.log('todoId: ', todoId);
                axios.delete(`/todos/?todoId=${todoId}`)
                .catch((err) => console.error(err))
            })
            .then(() => {
                loadTodos();
            })
            .catch((err) => console.error(err))
    }

    const modifyUpdateMode = () => {
        setUpdateMode(!updateMode);
    }

    return (
        <div  id="todoItemContainer">
            { updateMode
            // needs loadTags as well ... 
            ? <AddTodoForm mode={"UPDATE"} exit={setUpdateMode} handleSubmit={AddTodoSubmit} loadTodos={loadTodos} loadTags={loadTags} todoId={todo.todo_id} task={todo.task} description={todo.description} priority={todo.priority} due={todo.date_due.split('T')[0]} tags={tags} clickHandler={modifyUpdateMode} submitText={"Save"}/>
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
