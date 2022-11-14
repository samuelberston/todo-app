import React, {useState, useEffect} from 'react';
import axios from 'axios';

import styles from './Today.module.css';

import TodoList from './TodoList/TodoList.jsx';

const Today = () => {

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
        <div id={styles.today}>
            Today's to-dos
            <TodoList todos={todos} />
        </div>
    );
}

export default Today;
