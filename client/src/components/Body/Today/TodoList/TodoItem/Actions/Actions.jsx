import React from 'react';

import parentStyles from '../TodoItem.module.css';
import styles from './Actions.module.css';

import UpdateTodo from './UpdateTodo/UpdateTodo.jsx';

const Actions = () => {
    return (
        <div id={parentStyles.actions} className={styles.Actions}>
            <i class="fas fa-edit"></i>
            <i class="fa-solid fa-ellipsis"></i>
        </div>
    );
}

export default Actions;
