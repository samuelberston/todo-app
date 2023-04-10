import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import {getAllTagsApi} from '../../../../../../../../services/tags.service.js';

import AddTagsDropdown from './AddTagsDropdown/AddTagsDropdown.jsx';

const AddTags = (props) => {
    const [active, setActive] = useState(false);

    return (
        <div id="addTags">
            <div id="tagIcon" onClick={() => {setActive(!active)}}>
                <i className="fa-solid fa-tag"></i>
            </div>
            {
                active && <AddTagsDropdown dispatch={props.dispatch} selectedTags={props.selectedTags} />
            }
        </div>
    );
}

export default AddTags;
