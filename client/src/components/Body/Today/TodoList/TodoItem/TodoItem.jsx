import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';
import TaskContent from './TaskContent/TaskContent.jsx';
import Actions from './Actions/Actions.jsx';

import AddTodoForm from '../AddTodo/AddTodoForm/AddTodoForm.jsx';
import AddTodoSubmit from '../AddTodo/AddTodoForm/AddTodoFormHelpers/AddTodoSubmit.js';

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const { todo, loadTodos } = props;
    const { todo_id, priority } = todo;

    const [tags, setTags] = useState({});
    const [updateMode, setUpdatetMode] = useState(false);

    useEffect(() => {
        loadTags();
    }, []); 
    
    // get all Tags for the todo and set the state
    const loadTags = () =>  {
        axios.get( `/tags?todoId=${todo_id}`)
            .then(res => {
                setTags(res.data)
            })
            .catch(err => console.error(err));
    }

    const onCheck = (todoId) => {
        axios.delete(`/todos/?todoId=${todoId}`)
            .then(() => {
                loadTodos();
            })
            .catch((err) => console.error(err))
    }

    const modifyUpdateMode = () => {
        setUpdatetMode(!updateMode);
    }

    return (
        <div  id="todoItemContainer">
            { updateMode
            ? <AddTodoForm mode={"UPDATE"} exit={setUpdatetMode} handleSubmit={AddTodoSubmit} loadTodos={loadTodos} todoId={todo.todo_id} task={todo.task} description={todo.description} priority={todo.priority} tags={tags} clickHandler={modifyUpdateMode} submitText={"Update Todo"}/>
            : <div id={styles.todoItem}>
                <Grip />
                <Checkbox onCheck={onCheck} todoId={todo_id} priority={priority} />
                <TaskContent task={todo.task} description={todo.description} tags={tags} />
                <Actions loadTodos={loadTodos} modifyUpdateMode={modifyUpdateMode} />
            </div>}
        </div>
    );
}

export default TodoItem;
