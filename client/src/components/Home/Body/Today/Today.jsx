import { useAuth0 } from '@auth0/auth0-react';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getTodosApi, getTodosFromListApi} from '../../../../services/todos.service.js';
import { getAllTagsApi } from '../../../../services/tags.service.js';

import styles from './Today.module.css';

import TodoList from './TodoList/TodoList.jsx';

const Today = (props) => {
  const [todos, setTodos] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { userUUID, listView } = props;

  const loadTodos = async () => {
    const accessToken = await getAccessTokenSilently();
    var data;
    var error;
    if (listView == 'Today') {
      var { data, error } = await getTodosApi(accessToken, userUUID);
    } else {
      var { data, error } = await getTodosFromListApi(accessToken, userUUID, listView);
    }
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
  }, [listView]);

  return (
    <div id={styles.today}>
      <div id={styles.title}>
        {'Today' || props.listView}
      </div>
      <TodoList todos={todos} loadTodos={loadTodos}/>
    </div>
  );
};

Today.propTypes = {
  userUUID: PropTypes.string.isRequired
}

export default Today;
