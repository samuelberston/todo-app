import React, {useState} from 'react';

import AddTask from './AddTask/AddTask.jsx';
import AddTodoForm from './AddTodoForm/AddTodoForm.jsx';

import styles from './AddTodo.module.css';

const AddTodo = () => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(!active)
    }

    return (
        <div id="addTodo" >
            <AddTask onClick={clickHandler}/>
        </div>
    );
}

export default AddTodo;
