import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Navigation from './Navigation/Navigation.jsx';
import { Body } from './Body/Body.jsx';
import styles from './Home.module.css';

const Home = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isAuthenticated } = useAuth0();

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div id={styles.container}>
      <Navigation handleMenuClick={handleMenuClick} />
      { isAuthenticated
        ? <Body showMenu={showMenu} />
        : <div>Login to view todos</div>
      }
    </div>
  );
};

export default Home;
