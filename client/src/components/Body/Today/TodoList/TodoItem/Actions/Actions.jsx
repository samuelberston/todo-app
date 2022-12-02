import React from 'react';

import styles from '../TodoItem.module.css';

import UpdateTodo from './UpdateTodo/UpdateTodo.jsx';

const Actions = () => {
    return (
        <div id={styles.actions} >
            <i class="fas fa-edit"></i>
            <i class="fa-solid fa-ellipsis"></i>
        </div>
    );
}

export default Actions;
