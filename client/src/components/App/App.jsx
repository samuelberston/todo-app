import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './App.module.css';

import Header from '../Header/Header.jsx';
import Body from '../Body/Body.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

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
    <div id={styles.container}>
      <Header username="Samuel"/>
      <Body />
    </div>
  );
};
export default App;
