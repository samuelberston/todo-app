import React from 'react';

import TodoList from './TodoList/TodoList.jsx';

const Today = (props) => {
    return (
        <div id="today">
            Today's to-dos
            <TodoList todos={props.todoItems}/>
        </div>
    );
}

export default Today;
