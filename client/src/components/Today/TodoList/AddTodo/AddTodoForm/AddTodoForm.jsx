import React from 'react';

const AddTodoForm = (props) => {
    return (
        <div id="addTodoForm">
            addTodoForm
            <button onClick={props.clickHandler}>
                Cancel
            </button>
        </div>
    );
}

export default AddTodoForm;
