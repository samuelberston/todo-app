import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem/TodoItem.jsx';
import AddTodo from './AddTodo/AddTodo.jsx';

const TodoList = (props) => {
    const {todos, loadTodos} = props; 
    return (
        <div id="TodoList">
            {todos.map((item) => {
                return <TodoItem key={item.todo_id} todo={item} loadTodos={loadTodos}/>
            })}
            <AddTodo loadTodos={loadTodos}/>
        </div>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    loadTodos: PropTypes.func
}

export default TodoList;
