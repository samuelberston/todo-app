import React, {useState, useEffect} from 'react';
import axios from 'axios';

import styles from './Today.module.css';

import TodoList from './TodoList/TodoList.jsx';

const Today = () => {
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
    <div id={styles.today}>
      <div id={styles.title}>
        Today
      </div>
      <TodoList todos={todos} loadTodos={loadTodos}/>
    </div>
  );
};

export default Today;
