import React, { useState } from 'react';

import styles from './AddPriority.module.css';

import AddPriorityDropdown from './AddPriorityDropdown.jsx';

const AddPriority = (props) => {
    const [active, setActive] = useState(false);

    return (
        <div id="AddPriority">
            <div id="flagIcon" onClick={() => {setActive(!active)}}>
                <i class="fa-solid fa-flag"></i>
            </div>
            {active && <AddPriorityDropdown handlePriorityInputChange={props.handlePriorityInputChange} />}
        </div>
    )
}

export default AddPriority;
