import React from 'react';
import PropTypes from 'prop-types';
import Tags from './Tags/Tags.jsx';
import DueDate from './DueDate/DueDate.jsx';
import ListName from './ListName/ListName.jsx';
import styles from './TaskContent.module.css';

const TaskContent = (props) => {
    const { todo, tags } = props;
    return (
        <div id={styles.todoContent}>
            <div id={styles.todoName}>
                {todo.task}
            </div>
            {
                props.description != undefined ?
                (<div id={styles.description}>
                    {todo.description}
                </div>) :
                ''
            }
            <div id={styles.todoMetadata}>
                <div id={styles.leftMetadata}>
                    <DueDate due={todo.date_due}/>
                    {
                        tags.length != 0 ?
                        (<Tags tags={tags}/>) :
                        ''
                    }
                </div>
                <div id={styles.rightMetadata}>
                  <ListName listName={todo.list_name} listUUID={todo.list_uuid} />
                </div>
            </div>
        </div>
    );
};

TaskContent.propTypes = {
  todo: PropTypes.object.isRequired,
  tags: PropTypes.any
};

export default TaskContent;
