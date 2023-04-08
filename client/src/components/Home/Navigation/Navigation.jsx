import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import styles from './Navigation.module.css';

import Menu from './Menu/Menu.jsx';
import Home from './Home/Home.jsx';
import Search from './Search/Search.jsx';
import NewTask from './NewTask/NewTask.jsx';
import Help from './Help/Help.jsx';
import Notifications from './Notifications/Notifcations.jsx';
import User from './User/User.jsx';
import LoginButton from './Login/LoginButton.jsx';
import LogoutButton from './Logout/LogoutButton.jsx';
import SignupButton from './SignUp/SignupButton.jsx';

const Navigation = (props) => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <div id={styles.navigation}>
            <Menu handleMenuClick={props.handleMenuClick}/>
            <Home />
            <Search />
            <NewTask />
            <Help />
            <Notifications />
            {!isAuthenticated && (
              <>
                <SignupButton />
                <LoginButton />
              </>
            )}
            {isAuthenticated && (
              <>
                <User username={user.name}/>
                <LogoutButton />
              </>
            )}
        </div>
    )
}

export default Navigation;