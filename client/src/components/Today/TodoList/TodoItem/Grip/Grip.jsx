import React from 'react';

import styles from '../TodoItem.module.css';

const Grip = (props) => {
    return (
        <div id={styles.grip} className={props.show ? styles.show : styles.hide}>
            <i class="fa-solid fa-grip-vertical"></i>
        </div>
    );
}

export default Grip;
