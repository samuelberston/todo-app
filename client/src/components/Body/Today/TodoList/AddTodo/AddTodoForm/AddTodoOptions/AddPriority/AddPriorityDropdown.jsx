import React, { useState } from 'react';

const AddPriorityDropdown = (props) => {
    return (
        <select id="priorityDropdown" onChange={props.handlePriorityInputChange}>
            <option value="p1">Priority 1</option>
            <option value="p2">Priority 2</option>
            <option value="p3">Priority 3</option>
            <option value="p4" selected>Priority 4</option>
        </select>
    )
}

export default AddPriorityDropdown;
