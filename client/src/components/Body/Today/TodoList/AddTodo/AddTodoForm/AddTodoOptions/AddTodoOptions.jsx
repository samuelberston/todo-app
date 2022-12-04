import React from 'react';

import styles from './AddTodoOptions.module.css';

import AddTags from './AddTags/AddTags.jsx';
import AddPriority from './AddPriority/AddPriority.jsx';

const AddTodoOptions = (props) => {
    return (
        <div id={styles.options}>
            <AddTags handleTagsInputChange={props.handleTagsInputChange} />
            <AddPriority priority={props.priority} handlePriorityInputChange={props.handlePriorityInputChange} />
            {/*
                due date
                tags
                priority
            */}
        </div>
    );
}

export default AddTodoOptions;
