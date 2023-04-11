import React from 'react';

import styles from './TodayButton.module.css';

const TodayButton = (props) => (
  <div id={styles.TodayButton} onClick={() => { props.setListView('Today'); }}>
    Today
  </div>
);

export default TodayButton;