import { useAuth0 } from '@auth0/auth0-react';
import React, {useState, useEffect} from 'react';
import {getTodosApi} from '../../../../services/todos.service.js';
import {getAllTagsApi} from '../../../../services/tags.service.js';

import styles from './Today.module.css';

import TodoList from './TodoList/TodoList.jsx';

const Today = () => {
  const [todos, setTodos] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();

  const loadTodos = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getTodosApi(accessToken, user.sub);
    if (data) {
      setTodos(data);
      return {
        todos: data
      };
    }
    if (error) {
      setTodos(JSON.stringify(error, null, 2));
      throw new Error('Failed to load Todos');
    }
  };

  useEffect(() => {
    loadTodos();
  }, [getAccessTokenSilently]);

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
