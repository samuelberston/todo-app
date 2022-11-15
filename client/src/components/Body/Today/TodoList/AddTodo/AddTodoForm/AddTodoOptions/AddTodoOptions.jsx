import React from 'react';

import AddTags from './AddTags/AddTags.jsx';

const AddTodoOptions = () => {
    return (
        <div id="options">
            <AddTags />
            {/*
                due date
                tags
                priority
            */}
        </div>
    );
}

export default AddTodoOptions;
