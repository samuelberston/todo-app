import React from 'react';

import Tag from './Tag/Tag.jsx';

import styles from './Tags.module.css';

const Tags = (props) => {
    const { tags } = props;

    return (
        <div id={styles.tags}>
            {tags.map()}
        </div>
    );
}

export default Tags;
