import React from 'react';

import Tags from './Tags/Tags.jsx';
import DueDate from './DueDate/DueDate.jsx';
import ListName from './ListName/ListName.jsx';

import styles from './TaskContent.module.css';

const TaskContent = (props) => {
    return (
        <div id={styles.todoContent}>
            <div id={styles.todoName}>
                {props.task}
            </div>
            {
                props.description != undefined ?
                (<div id={styles.description}>
                    {props.description}
                </div>) :
                ''
            }
            <div id={styles.todoMetadata}>
                <div id={styles.leftMetadata}>
                    <DueDate due={props.due}/>
                    {
                        props.tags.length != 0 ?
                        (<Tags tags={props.tags}/>) :
                        ''
                    }
                </div>
                <div id={styles.rightMetadata}>
                  <ListName listName={props.listName} />
                </div>
            </div>
        </div>
    );
}

export default TaskContent;
