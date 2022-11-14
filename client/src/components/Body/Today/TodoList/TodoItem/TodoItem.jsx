import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';
import TaskContent from './TaskContent/TaskContent.jsx';
import Actions from './Actions/Actions.jsx';

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const { todo } = props;
    const { todo_id } = todo;

    const [tags, setTags] = useState({});

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
                props.loadTodos();
            })
            .catch((err) => console.error(err))
    }

    return (
        <div id={styles.todoItem} >
            <Grip />
            <Checkbox onCheck={onCheck} todoId={todo.todo_id} />
            <TaskContent task={todo.task} description={todo.description} tags={tags} />
            <Actions />
        </div>
    );
}

export default TodoItem;
