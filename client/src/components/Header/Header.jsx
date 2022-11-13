import React from 'react';

import styles from './Header.module.css';

import Notifications from './Notifications/Notifcations.jsx';
import User from './User/User.jsx';

const Header = (props) => {
    return (
        <div id={styles.header}>
            <Notifications />
            <User username={props.username}/>
        </div>
    )
}

export default Header;