import React from 'react';

const List = (props) => (
  <div id="list">
    <div id="listName">
      {props.list.list_name}
    </div>
    <div id="todoCount">
      {props.list.todo_count}
    </div>
  </div>
);

export default List;