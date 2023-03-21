import React, { useState } from 'react';

// need to make this component reusable for the UpdateTodo component
// pass the todo's priority as prop and have that option selected

const AddPriorityDropdown = (props) => {
    // function so that it selects the option
    return (
        <select id="priorityDropdown" value={props.priority} onChange={(event) => {
            props.dispatch( {type: "PRIORITY", val: event.target.value})}}>
            <option value="p1">Priority 1</option>
            <option value="p2">Priority 2</option>
            <option value="p3">Priority 3</option>
            <option value="p4">Priority 4</option>
        </select>
    )
}

export default AddPriorityDropdown;
