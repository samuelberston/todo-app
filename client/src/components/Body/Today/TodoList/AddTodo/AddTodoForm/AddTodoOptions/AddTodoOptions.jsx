import React from 'react';

import AddTags from './AddTags/AddTags.jsx';

const AddTodoOptions = (props) => {
    return (
        <div id="options">
            <AddTags handleTagsInputChange={props.handleTagsInputChange} />
            {/*
                due date
                tags
                priority
            */}
        </div>
    );
}

export default AddTodoOptions;
