import React from 'react';

import styles from './AddtodoInputs.module.css';

// FIX THIS -- add character limit for description (the db schema only allows 25 chars)
const AddTodoInputs = (props) => {
    return (
        <div id={styles.addTodoInputs}>
            <input type="text" name="taskName" placeholder="Task name" value={props.taskName} onChange={props.handleTaskNameInputChange}></input>
            <input type="text" name="description" placeholder="Description" value={props.description} onChange={props.handleDescriptionInputChange} maxLength={65535}></input>
         </div>
    );
}

export default AddTodoInputs;
