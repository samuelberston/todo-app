import React, {useState} from 'react';
import axios from 'axios';

import styles from './Checkbox.module.css';

const Checkbox = (props) => {
    const {todoId} = props;
    const [show, hide] = useState(false);

    const handleClick = (todoId) => {
        props.onCheck(todoId)
    }

    return (
        <div id={styles.checkbox} onMouseOver={() => hide(true)} onMouseLeave={() => hide(false)} onClick={() => {handleClick(todoId)}}>
            <div className={show ? styles.show : styles.hide}>
                <i class={"fa-solid fa-check"} ></i>
            </div>
        </div>
    );
}

export default Checkbox;
