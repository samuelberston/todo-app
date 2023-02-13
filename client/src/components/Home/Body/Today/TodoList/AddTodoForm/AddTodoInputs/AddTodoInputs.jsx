import React, { useEffect } from 'react';

import { TodosDispatch } from '../AddTodoForm.jsx';

import styles from './AddTodoInputs.module.css';

// const dispatch = useContext(TodosDispatch);

// FIX THIS -- add character limit for description (the db schema only allows 25 chars)
const AddTodoInputs = (props) => {
    useEffect(() => {
        const taskInput = document.getElementsByClassName("taskInput");
        taskInput[0].select()
    }, []);
    return (
        <div id={styles.addTodoInputs}>
            <input id={styles.input} className={"taskInput"} type="text" name="taskName" placeholder="Task name" value={props.taskName} onChange={(event) => props.dispatch( {type: 'TASK', val: event.target.value} )} autofocus ></input>
            <input id={styles.input} type="text" name="description" placeholder="Description" value={props.description} onChange={(event) => props.dispatch( {type: 'DESCRIPTION', val: event.target.value})} maxLength={65535}></input>
         </div>
    );
}

export default AddTodoInputs;
