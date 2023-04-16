import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './Checkbox.module.css';

const Checkbox = (props) => {
    const {todoId, priority, onCheck} = props;

    return (
        <div id={styles.checkboxContainer}>
            <div id={styles[priority]} className={styles.checkbox} onClick={() => { onCheck(todoId); }}>
                <div id={styles.checkIcon}>
                    <i className={"fa-solid fa-check"} ></i>
                </div>
            </div>
        </div>
    );
};

Checkbox.propTypes = {
  todoId: PropTypes.string,
  priority: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired
};

export default Checkbox;
