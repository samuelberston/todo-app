import React from 'react';

import styles from './AddTodo.module.css';

const AddTodo = () => {
    return (
        <div id={styles.addTodo}>
            <div id={styles.addTodoIcon}>
                <i class="fa-solid fa-plus"></i>
            </div>
            <div id={styles.addTodoText}>
                Add task
            </div>
        </div>
    );
}

export default AddTodo;
