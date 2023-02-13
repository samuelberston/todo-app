import React from 'react';

import Header from './Header/Header.jsx';
import Body from './Body/Body.jsx';
import styles from './Home.module.css';

const Home = () => (
  <div id={styles.container}>
    <Header username="Samuel" />
    <Body />
  </div>
);

export default Home;
