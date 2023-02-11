import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

import styles from './App.module.css';

import Header from './Header/Header.jsx';
import Body from './Body/Body.jsx';
import Login from './Login/Login.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState();

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

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div id={styles.container}>
      <Header username="Samuel"/>
      <Body />
    </div>
  );
}

export default App;
