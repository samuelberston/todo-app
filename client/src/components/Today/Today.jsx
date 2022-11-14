import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TodoList from './TodoList/TodoList.jsx';

const Today = () => {

    const [todos, setTodos] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTodos();
    });

    const getTodos = () => {
        axios.get('/todos')
        .then(res => {
            setTodos(res.data)
        })
        .catch(err => console.error(err))
    }


    return (
        <div id="today">
            Today's to-dos
            <TodoList todos={todos}/>

        </div>
    );
}

export default Today;
