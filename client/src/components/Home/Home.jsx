import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Navigation from './Navigation/Navigation.jsx';
import Body from './Body/Body.jsx';
import styles from './Home.module.css';

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div id={styles.container}>
      <Navigation />
      { isAuthenticated
        ? <Body />
        : <div>Login to view todos</div>
      }
    </div>
  );
};

export default Home;
