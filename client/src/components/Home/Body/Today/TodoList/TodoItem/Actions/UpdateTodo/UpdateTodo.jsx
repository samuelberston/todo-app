import React from 'react';

import styles from './UpdateTodo.module.css';

// props: handler function to update todo, function to load todos
const UpdateTodo = (props) => {
    return (
        <div id={styles.UpdateTodo} onClick={props.modifyUpdateMode} >
            <i className="fas fa-edit"></i>
        </div>
    );
}

export default UpdateTodo;
