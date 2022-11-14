import React from 'react';

import Today from './Today/Today.jsx';

import styles from './Body.module.css';

const Body = () => {
    return (
        <div id={styles.body}>
            <Today />
        </div>
    );
} 

export default Body;
