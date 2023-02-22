import React, {useState} from 'react';
import axios from 'axios';

import styles from './Checkbox.module.css';

const Checkbox = (props) => {
    const {todoId, priority} = props;

    return (
        <div id={styles.checkboxContainer}>
            <div id={styles[priority]} className={styles.checkbox} onClick={() => {props.onCheck(todoId)}}>
                <div id={styles.checkIcon}>
                    <i className={"fa-solid fa-check"} ></i>
                </div>
            </div>
        </div>
    );
}

export default Checkbox;
