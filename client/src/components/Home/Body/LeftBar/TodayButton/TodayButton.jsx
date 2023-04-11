import React, { useContext } from 'react';
import { ViewHookContext } from '../../ViewHookContext.js';
import styles from './TodayButton.module.css';

const TodayButton = (props) => {
    const setListView = useContext(ViewHookContext);
    return (
      <div id={styles.TodayButton} onClick={() => { setListView('Today'); }}>
        Today
      </div>
    );
}

export default TodayButton;