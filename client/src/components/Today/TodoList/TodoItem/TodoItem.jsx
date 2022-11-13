import React, {useState} from 'react';
import axios from 'axios';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';
import Actions from './Actions/Actions.jsx';

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const {todo} = props;

    const [show, hide] = useState(false);
    const [status, setStatus] = useState("active");

    const onCheck = (todoId) => {
        axios.delete(`/todos/?todoId=${todoId}`)
            .then(() => {
                setStatus("deleted")
            })
            .catch((err) => console.error(err))
    }

    return (
        <div id={styles.todoItem} onMouseOver={() => hide(true)} onMouseLeave={() => hide(false)}>
            <Grip show={show}/>
            <Checkbox onCheck={onCheck} todoId={todo.todo_id}/>
            {todo.task}
            <Actions show={show}/>
        </div>
    );
}

export default TodoItem;
