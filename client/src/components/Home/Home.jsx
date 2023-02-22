import React from 'react';

import Navigation from './Navigation/Navigation.jsx';
import Body from './Body/Body.jsx';
import styles from './Home.module.css';

const Home = () => (
  <div id={styles.container}>
    <Navigation username="Samuel" />
    <Body />
  </div>
);

export default Home;
