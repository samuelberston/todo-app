import React from 'react';

import styles from './Tag.module.css';

const Tag = (props) => {
    const { tagName } = props;

    return (
        <div id={styles.tag}>
            <div id="tagIcon">
                <i class="fa-solid fa-tag"></i>
            </div>
            <div id="tagName">
                {tagName}
            </div>
        </div>
    );
}

export default Tag;
