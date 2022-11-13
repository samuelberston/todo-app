import React from 'react';

import TodoItem from './TodoItem/TodoItem.jsx';

const TodoList = (props) => {
    const {todos} = props; 
    return (
        <div id="TodoList">
            todo list
            {todos.map((item) => {
                return <TodoItem todo={item}/>
            })}
        </div>
    );
}

export default TodoList;
