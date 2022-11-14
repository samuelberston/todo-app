import React from 'react';

import styles from './TaskContent.module.css';

const TaskContent = (props) => {
    return (
        <div id={styles.taskContent}>
            <div id={styles.task}>
                {props.task}
            </div>
            {
                props.description != undefined ?
                (<div id={styles.description}>
                    {props.description}
                </div>) :
                ''
            }
        </div>
    );
}

export default TaskContent;
