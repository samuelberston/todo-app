import React from 'react';

import parentStyles from '../TodoItem.module.css';
import styles from './Actions.module.css';

import UpdateTodo from './UpdateTodo/UpdateTodo.jsx';

const Actions = (props) => {
    return (
        <div id={parentStyles.actions} className={styles.Actions}>
            <UpdateTodo modifyUpdateMode={props.modifyUpdateMode} />
            <i className="fa-solid fa-ellipsis"></i>
        </div>
    );
}

export default Actions;
