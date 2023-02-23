import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.css';


import axios from 'axios';

import Home from '../Home/Home.jsx';

axios.defaults.baseURL = 'http://127.0.0.1:3000';

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
    </Routes>
  );
};

export default App;
