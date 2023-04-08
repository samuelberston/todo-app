import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.css';

import Home from '../Home/Home.jsx';
import ProfilePage from '../ProfilePage/ProfilePage.jsx';

const App = () => {
  const { isLoading } = useAuth0();

    if (isLoading) {
      return (
        <div className={styles.loading}>
          <div>Loading...</div>
        </div>
      );
    }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
