import React from 'react';

import styles from './AddtodoInputs.module.css';

const AddTodoInputs = (props) => {
    return (
        <div id="addTodoInputs">
            <input type="text" name="taskName" placeholder="Task name" value={props.taskName} onChange={props.handleTaskNameInputChange}></input>
            <input type="text" name="description" placeholder="Description" value={props.description} onChange={props.handleDescriptionInputChange}></input>
         </div>
    );
}

export default AddTodoInputs;
