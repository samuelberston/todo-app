import React, {Suspense, useState} from 'react';

import AddTask from './AddTask/AddTask.jsx';
const AddTodoForm = React.lazy(() => import('../AddTodoForm/AddTodoForm.jsx'));

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
                // use provider for loadTodos
                <React.Suspense fallback={<div>Loading...</div>}>
                    <AddTodoForm mode={"ADD"} submitText={"Add Task"} exit={clickHandler} loadTodos={props.loadTodos}  />
                </ React.Suspense>
                : <AddTask clickHandler={clickHandler} />
            }
        </div>
    );
}

export default AddTodo;