import React, {useState} from 'react';

import Grip from './Grip/Grip.jsx';
import Checkbox from './Checkbox/Checkbox.jsx';

import styles from './TodoItem.module.css';

const TodoItem = (props) => {
    const {todo} = props;

    const [show, hide] = useState(false);

    return (
        <div id={styles.todoItem} onMouseOver={() => hide(true)} onMouseLeave={() => hide(false)}>
            <Grip show={show}/>
            <Checkbox />
            {todo.task}
        </div>
    );
}

export default TodoItem;
