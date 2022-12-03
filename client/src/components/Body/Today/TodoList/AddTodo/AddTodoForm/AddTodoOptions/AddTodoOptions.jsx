import React from 'react';

import AddTags from './AddTags/AddTags.jsx';
import AddPriority from './AddPriority/AddPriority.jsx';

const AddTodoOptions = (props) => {
    return (
        <div id="options">
            <AddTags handleTagsInputChange={props.handleTagsInputChange} />
            <AddPriority />
            {/*
                due date
                tags
                priority
            */}
        </div>
    );
}

export default AddTodoOptions;
