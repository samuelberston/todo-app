import React, { useState } from 'react';

import styles from './AddPriority.module.css';

import AddPriorityDropdown from './AddPriorityDropdown.jsx';

const AddPriority = (props) => {
    const [active, setActive] = useState(false);

    return (
        <div id="AddPriority" onClick={() => {setActive(!active)}}>
            <div id="flagIcon">
                <i class="fa-solid fa-flag"></i>
            </div>
            {active && <AddPriorityDropdown />}
        </div>
    )
}

export default AddPriority;
