import React, {useState} from 'react';

import AddTask from './AddTask/AddTask.jsx';
import AddTodoForm from '../AddTodoForm/AddTodoForm.jsx';

import AddTodoSubmit from '../AddTodoForm/AddTodoFormHelpers/AddTodoSubmit.js';

import styles from './AddTodo.module.css';

const AddTodo = (props) => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(!active)
    }

    return (
        <div id="addTodoContainer" >
            {
                active ?
                <AddTodoForm mode={"ADD"} clickHandler={clickHandler} loadTodos={props.loadTodos} handleSubmit={AddTodoSubmit} submitText={"Add Task"}/>
                : <AddTask clickHandler={clickHandler} />

            }
        </div>
    );
}

export default AddTodo;
