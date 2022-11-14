import React, {useState} from 'react';
import axios from 'axios';

import styles from './Checkbox.module.css';

const Checkbox = (props) => {
    const {todoId} = props;

    const handleClick = (todoId) => {
        props.onCheck(todoId)
    }

    return (
        <div id={styles.checkbox} onClick={() => {handleClick(todoId)}}>
            <div id={styles.checkIcon}>
                <i class={"fa-solid fa-check"} ></i>
            </div>
        </div>
    );
}

export default Checkbox;
