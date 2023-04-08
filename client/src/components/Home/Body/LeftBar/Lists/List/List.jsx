import React from 'react';

const List = (props) => (
  <div>
    {props.list.name}
    {props.list.todo_count}
  </div>
);

export default List;