import React, { useState } from 'react';

import styles from '../Lists.module.css';

const ToggleLists = (props) => (
    <div id="ToggleList" id={styles.ListOption} onClick={() => { props.toggleShowLists(); }}>
      <i className="fa-solid fa-chevron-down"></i>
    </div>
);

export default ToggleLists;