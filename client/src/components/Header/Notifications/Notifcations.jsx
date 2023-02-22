import React from 'react';

import styles from './Notifications.module.css';

const Notifications = () => {
    return (
        <div id={styles.notifications}>
            <i className="fa-regular fa-bell"></i>
        </div>
    );
}

export default Notifications;
