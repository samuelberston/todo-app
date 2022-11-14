import React, {useState} from 'react';

import AddTask from './AddTask/AddTask.jsx';
import AddTodoForm from './AddTodoForm/AddTodoForm.jsx';

import styles from './AddTodo.module.css';

const AddTodo = () => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        console.log('clicked')
        setActive(!active)
    }

    return (
        <div id="addTodo" >
            {
                active ?
                <AddTodoForm clickHandler={clickHandler} />
                : <AddTask clickHandler={clickHandler} />

            }
        </div>
    );
}

export default AddTodo;
