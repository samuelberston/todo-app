import React from 'react';

import styles from './Navigation.module.css';

import Menu from './Menu/Menu.jsx';
import Home from './Home/Home.jsx';
import Search from './Search/Search.jsx';
import NewTask from './NewTask/NewTask.jsx';
import Help from './Help/Help.jsx';
import Notifications from './Notifications/Notifcations.jsx';
import User from './User/User.jsx';

const Navigation = (props) => {
    return (
        <div id={styles.navigation}>
            <Menu />
            <Home />
            <Search />
            <NewTask />
            <Help />
            <Notifications />
            <User username={props.username}/>
        </div>
    )
}

export default Navigation;