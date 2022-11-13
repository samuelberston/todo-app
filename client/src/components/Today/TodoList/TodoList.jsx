import React from 'react';

import TodoItem from './TodoItem/TodoItem.jsx';
import AddTodo from './AddTodo/AddTodo.jsx';

const TodoList = (props) => {
    const {todos} = props; 
    return (
        <div id="TodoList">
            todo list
            {todos.map((item) => {
                return <TodoItem todo={item}/>
            })}
            <AddTodo />
        </div>
    );
}

export default TodoList;
