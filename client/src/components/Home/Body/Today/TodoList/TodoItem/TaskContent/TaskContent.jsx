import React from 'react';

import Tags from './Tags/Tags.jsx';
import DueDate from './DueDate/DueDate.jsx';
import List from './List/List.jsx';

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
            {
                props.tags.length != 0 ?
                (<Tags tags={props.tags}/>) :
                ''
            }
            <DueDate due={props.due}/>
            <List list={props.list} />
        </div>
    );
}

export default TaskContent;
