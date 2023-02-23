import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddTagsDropdown from './AddTagsDropdown.jsx';

// this element will enable a user to add existing tags to a todo item and create a new tag
// props: tags, function to handle tag input change

const AddTags = (props) => {
    const [active, setActive] = useState(false);
    const [tags, setTags] = useState({});
    const { handleTagsInputChange } = props;

    useEffect(() => {
        loadAllTags();
    }, []);

    const loadAllTags = () => {
        axios.get('/tags')
            .then(res => {
                setTags(res.data)
            })
            .catch(err => console.error(err));
    }

    return (
        <div id="addTags">
            <div id="tagIcon" onClick={() => {setActive(!active)}}>
                <i className="fa-solid fa-tag"></i>
            </div>
            {
                active && <AddTagsDropdown dispatch={props.dispatch} selectedTags={props.selectedTags} tags={tags} />
            }
        </div>
    );
}

export default AddTags;
