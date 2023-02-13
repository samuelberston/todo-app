import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [todos, setTodos] = useState([]);

  const loadTodos = () => {
    axios.get('/todos')
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <RouterProvider router={router} />
  );
};
export default App;
