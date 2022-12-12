import React from 'react';

import styles from './AddTodoOptions.module.css';

import AddTags from './AddTags/AddTags.jsx';
import AddPriority from './AddPriority/AddPriority.jsx';

const AddTodoOptions = (props) => {
    return (
        <div id={styles.options}>
            <AddTags dispatch={props.dispatch} selectedTags={props.selectedTags} />
            <AddPriority dispatch={props.dispatch} priority={props.priority} />
            {/*
                due date 
            */}
        </div>
    );
}

export default AddTodoOptions;
