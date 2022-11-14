import React from 'react';

import styles from './Tags.module.css';

const Tags = (props) => {
    const { tagName } = props;

    return (
        <div id={styles.tags}>
            <div id="tagIcon">
                <i class="fa-solid fa-tag"></i>
            </div>
            <div id="tagName">
                {tagName}
            </div>
        </div>
    );
}

export default Tags;
