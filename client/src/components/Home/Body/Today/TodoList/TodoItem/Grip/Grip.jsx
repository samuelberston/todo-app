import React from 'react';

import styles from '../TodoItem.module.css';

const Grip = () => {
    return (
        <div id={styles.grip}>
            <i className="fa-solid fa-grip-vertical"></i>
        </div>
    );
}

export default Grip;
