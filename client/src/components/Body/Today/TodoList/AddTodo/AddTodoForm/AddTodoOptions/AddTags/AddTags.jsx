import axios from 'axios';
import React, { useEffect, useState } from 'react';

// this element will enable a user to add existing tags to a todo item and create a new tag
// props: tags, function to handle tag input change

const AddTags = (props) => {
    const [active, setActive] = useState(false);
    const [tags, setTags] = useState({});

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
                <i class="fa-solid fa-tag"></i>
            </div>
            {
                active && "add/create tags dropdown menu"
            }
        </div>
    );
}

export default AddTags;
