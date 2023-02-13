import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import axios from 'axios';

import styles from './App.module.css';

import Header from '../Header/Header.jsx';
import Body from '../Body/Body.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element:
  <div id={styles.container}>
    <Header username="Samuel" />
    <Body />
  </div>,
  },
]);

const App = () => (
  <RouterProvider
    router={router}
    // fallbackElement={}
  />
);

export default App;
