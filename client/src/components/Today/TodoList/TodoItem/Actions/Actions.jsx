import React from 'react';

import styles from '../TodoItem.module.css';

const Actions = (props) => {
    return (
        <div id={styles.actions} >
            <i class="fa-solid fa-ellipsis"></i>
        </div>
    );
}

export default Actions;
