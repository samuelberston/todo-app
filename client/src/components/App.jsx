import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

import styles from './App.module.css';

import Header from './Header/Header.jsx';
import Body from './Body/Body.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    axios.get('/todos')
    .then(res => {
      setTodos(res.data)
    })
    .catch(err => console.error(err))
  }

  return (
    <div id={styles.container}>
      <Header username="Samuel"/>
      <Body />
    </div>
  );

}

export default App;
