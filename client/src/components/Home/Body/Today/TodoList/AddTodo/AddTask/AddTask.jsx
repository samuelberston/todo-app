import React from 'react';

import styles from "./AddTask.module.css";

const AddTask = (props) => {
    return (
        <div id={styles.addTask} onClick={props.clickHandler}>
            <div id={styles.addTaskIcon}>
                <i className="fa-solid fa-plus"></i>
            </div>
            <div id={styles.addTaskText}>
                Add task
            </div>
        </div>
    );
}

export default AddTask;
